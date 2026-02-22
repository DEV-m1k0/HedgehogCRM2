import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import type { BaseEvent } from './Schedule.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core';
import { coursesApi, groupsApi, metaApi, scheduleApi } from '../../api/crm';
import type { Course, User } from '../../types/crm.types';
import { useNotifications } from '../../components/feedback/Notifications';

import './Schedule.css';

const COURSE_COLORS = ['#4c9f70', '#2d7dd2', '#ff7f50', '#f7b32b', '#7a5cff', '#9c6644', '#2a9d8f', '#e76f51'];

const hashString = (value: string): number => value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

const toApiLocalDateTime = (date: Date): string => {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return `${offsetDate.toISOString().slice(0, 19)}`;
};

const getCurrentUser = (): User | null => {
  const raw = localStorage.getItem('user');
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const SchedulePage = () => {
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const calendarRef = useRef<FullCalendar | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const currentUser = getCurrentUser();
  const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
  const roleName = roleRaw.toLowerCase();
  const isTeacher = roleName === 'преподаватель';
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');

  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | 'all'>(() => (isTeacher && currentUser ? currentUser.id : 'all'));
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    if (isTeacher && currentUser) {
      setSelectedTeacherId(currentUser.id);
    }
  }, [isTeacher, currentUser]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const teacherOptions = useMemo(
    () => users.filter((user) => user.role.name.toLowerCase() === 'преподаватель'),
    [users],
  );

  const getCourseColor = (courseName: string) => COURSE_COLORS[hashString(courseName) % COURSE_COLORS.length];

  const load = async () => {
    const teacherIdForRequest = selectedTeacherId === 'all' ? undefined : selectedTeacherId;

    const [lessonsRes, groupsRes, coursesRes, usersRes, makeupsRes] = await Promise.all([
      scheduleApi.lessons(teacherIdForRequest),
      groupsApi.list(),
      coursesApi.list(),
      metaApi.users(),
      scheduleApi.makeupCalendar(teacherIdForRequest, true),
    ]);

    const groupsData = groupsRes.data;
    const coursesData = coursesRes.data;
    setCourses(coursesData);
    setUsers(usersRes.data);

    const groupMap = new Map(groupsData.map((group) => [group.id, group]));
    const courseMap = new Map(coursesData.map((course) => [course.id, course]));

    const renderedLessonEvents = lessonsRes.data
      .filter((lesson) => {
        if (selectedTeacherId === 'all') {
          return true;
        }
        const group = groupMap.get(lesson.group_id);
        return group?.teacher_id === selectedTeacherId;
      })
      .map((lesson) => {
        const group = groupMap.get(lesson.group_id);
        const course = group ? courseMap.get(group.course_id) : undefined;
        const courseName = course?.name ?? 'Без курса';
        let color = getCourseColor(courseName);
        if (lesson.is_cancelled) {
          color = '#9ca3af';
        } else if (lesson.is_conducted) {
          color = '#16a34a';
        }
        const recurringLabel = lesson.is_recurring_weekly ? ' (каждую неделю)' : '';

        return {
          id: String(lesson.id),
          title: `${courseName}: ${lesson.topic}${recurringLabel}`,
          start: lesson.start_at,
          end: lesson.end_at,
          color,
          extendedProps: {
            eventKind: 'lesson',
            lessonType: lesson.lesson_type,
            isCancelled: lesson.is_cancelled,
            isConducted: lesson.is_conducted,
          },
        } satisfies BaseEvent;
      });

    const renderedMakeupEvents = makeupsRes.data.map((makeup) => {
      const startDate = new Date(makeup.makeup_lesson_at);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      const participantsLabel = makeup.participants_count > 1 ? ` (${makeup.participants_count} учен.)` : '';
      return {
        id: `makeup-${makeup.attendance_id}`,
        title: `${makeup.makeup_completed ? '[Done]' : '[Makeup]'} Отработка${participantsLabel}: ${makeup.client_full_name}`,
        start: makeup.makeup_lesson_at,
        end: endDate.toISOString(),
        color: makeup.makeup_completed ? '#16a34a' : '#dc2626',
        editable: false,
        extendedProps: {
          eventKind: 'makeup',
          lessonType: 'makeup',
          clientId: makeup.client_id,
          makeupGroupId: makeup.makeup_group_id,
          makeupTeacherId: makeup.makeup_teacher_id,
          makeupAt: makeup.makeup_lesson_at,
          isCancelled: false,
          isConducted: makeup.makeup_completed,
        },
      } satisfies BaseEvent;
    });

    setEvents([...renderedLessonEvents, ...renderedMakeupEvents]);
  };

  useEffect(() => {
    load().catch(console.error);
  }, [selectedTeacherId]);

  useEffect(() => {
    let updateTimeout: ReturnType<typeof setTimeout> | null = null;

    const updateCalendarSize = () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      const api = calendarRef.current?.getApi();
      if (!api) {
        return;
      }
      requestAnimationFrame(() => api.updateSize());
      updateTimeout = setTimeout(() => api.updateSize(), 340);
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => updateCalendarSize())
      : null;

    if (resizeObserver && containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateCalendarSize);
    updateCalendarSize();

    return () => {
      window.removeEventListener('resize', updateCalendarSize);
      resizeObserver?.disconnect();
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, []);

  const handleDateClick = (info: DateClickArg) => {
    const params = new URLSearchParams({ date: info.dateStr });
    if (selectedTeacherId !== 'all') {
      params.set('teacherId', String(selectedTeacherId));
    }
    navigate(`/calendar/new?${params.toString()}`);
  };

  const handleEventClick = (info: EventClickArg) => {
    if (String(info.event.id).startsWith('makeup-')) {
      if (isManager || isAdmin) {
        const params = new URLSearchParams();
        const makeupTeacherId = info.event.extendedProps?.makeupTeacherId as number | null | undefined;
        const makeupAt = info.event.extendedProps?.makeupAt as string | undefined;
        if (makeupTeacherId) {
          params.set('teacherId', String(makeupTeacherId));
        }
        if (makeupAt) {
          params.set('date', makeupAt.slice(0, 10));
          params.set('makeupAt', makeupAt);
        }
        params.set('mode', 'makeup');
        navigate(`/calendar/new?${params.toString()}`);
        return;
      }
      const clientId = info.event.extendedProps?.clientId as number | undefined;
      if (clientId) {
        navigate(`/clients/${clientId}`);
        return;
      }
      navigate('/makeups');
      return;
    }
    navigate(`/calendar/${info.event.id}/edit`);
  };

  const handleEventDrop = async (info: EventDropArg) => {
    if (String(info.event.id).startsWith('makeup-')) {
      info.revert();
      return;
    }

    const lessonId = Number(info.event.id);
    if (!Number.isInteger(lessonId) || lessonId <= 0 || !info.event.start) {
      info.revert();
      return;
    }

    const previousStart = info.oldEvent.start;
    const previousEnd = info.oldEvent.end;
    const previousDuration = previousStart && previousEnd ? previousEnd.getTime() - previousStart.getTime() : 60 * 60 * 1000;
    const nextStart = info.event.start;
    const nextEnd = info.event.end ?? new Date(nextStart.getTime() + previousDuration);

    try {
      await scheduleApi.updateLesson(lessonId, {
        start_at: toApiLocalDateTime(nextStart),
        end_at: toApiLocalDateTime(nextEnd),
        apply_to_future: false,
      });
      notify('success', 'Занятие перенесено', 'Новое время занятия сохранено.');
      await load();
    } catch (error) {
      console.error(error);
      info.revert();
      notify('error', 'Ошибка', 'Не удалось сохранить новое время занятия.');
    }
  };

  const renderEventContent = (info: EventContentArg) => {
    const timeText = info.timeText || (info.event.start
      ? info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      : '');
    const lessonType = (info.event.extendedProps?.lessonType as string | undefined) ?? 'group';
    const typeLabel = lessonType === 'individual'
      ? 'Индивидуальное'
      : lessonType === 'makeup'
        ? 'Отработка'
        : 'Групповое';
    const isCancelled = Boolean(info.event.extendedProps?.isCancelled);
    const isConducted = Boolean(info.event.extendedProps?.isConducted);
    const statusLabel = isCancelled ? 'Отменено' : isConducted ? 'Проведено' : '';

    return (
      <div className="calendar-event-inner">
        {timeText ? <div className="calendar-event-time">{timeText}</div> : null}
        <div className="calendar-event-meta">
          <span className={`calendar-event-type calendar-event-type--${lessonType}`}>{typeLabel}</span>
          {statusLabel ? <span className="calendar-event-status">{statusLabel}</span> : null}
        </div>
        <div className="calendar-event-title">{info.event.title}</div>
      </div>
    );
  };

  const visibleEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return events;
    }
    return events.filter((event) => event.title.toLowerCase().includes(term));
  }, [events, searchTerm]);

  const isMobileCalendar = viewportWidth <= 640;
  const calendarHeaderToolbar = isMobileCalendar
    ? { left: 'prev,next today', center: 'title', right: 'timeGridDay,listWeek,timeGridWeek' }
    : { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,listWeek' };

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (!api) {
      return;
    }

    const currentView = api.view.type;
    if (isMobileCalendar && currentView === 'dayGridMonth') {
      api.changeView('timeGridWeek');
    }
  }, [isMobileCalendar]);

  return (
    <section className="schedule-page" ref={containerRef}>
      <div className={`schedule-toolbar ${isManager ? 'schedule-toolbar--manager' : ''}`}>
        {isManager ? (
          <>
            <div className="schedule-controls schedule-controls--search">
              <label htmlFor="scheduleSearch">Поиск по занятиям</label>
              <input
                id="scheduleSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Тема, курс, отметка статуса..."
              />
              <small>Нажмите на день календаря, чтобы добавить новое занятие.</small>
            </div>

            {!isTeacher && (
              <div className="schedule-controls schedule-controls--teacher">
                <label htmlFor="teacherFilter">Преподаватель</label>
                <select
                  id="teacherFilter"
                  value={selectedTeacherId}
                  onChange={(e) => {
                    if (e.target.value === 'all') {
                      setSelectedTeacherId('all');
                      return;
                    }
                    setSelectedTeacherId(Number(e.target.value));
                  }}
                >
                  <option value="all">Все преподаватели</option>
                  {teacherOptions.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.second_name} {teacher.first_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          <>
            {!isTeacher && (
              <div className="schedule-controls schedule-controls--teacher">
                <label htmlFor="teacherFilter">Преподаватель</label>
                <select
                  id="teacherFilter"
                  value={selectedTeacherId}
                  onChange={(e) => {
                    if (e.target.value === 'all') {
                      setSelectedTeacherId('all');
                      return;
                    }
                    setSelectedTeacherId(Number(e.target.value));
                  }}
                >
                  <option value="all">Все преподаватели</option>
                  {teacherOptions.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.second_name} {teacher.first_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="schedule-controls schedule-controls--search">
              <label htmlFor="scheduleSearch">Поиск по занятиям</label>
              <input
                id="scheduleSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Тема, курс, отметка статуса..."
              />
              <small>Нажмите на день календаря, чтобы добавить новое занятие.</small>
            </div>
          </>
        )}
      </div>

      {!isTeacher && (
        <div className="schedule-mobile-filter">
          <label htmlFor="teacherFilterMobile">Преподаватель</label>
          <select
            id="teacherFilterMobile"
            value={selectedTeacherId}
            onChange={(e) => {
              if (e.target.value === 'all') {
                setSelectedTeacherId('all');
                return;
              }
              setSelectedTeacherId(Number(e.target.value));
            }}
          >
            <option value="all">Все преподаватели</option>
            {teacherOptions.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.second_name} {teacher.first_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <FullCalendar
        ref={calendarRef}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        editable
        eventStartEditable
        eventDurationEditable={false}
        fixedMirrorParent={document.body}
        selectable
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={calendarHeaderToolbar}
        views={{
          timeGridWeek: {
            dayHeaderFormat: { weekday: isMobileCalendar ? 'short' : 'long' },
          },
          dayGridMonth: {
            dayHeaderFormat: { weekday: isMobileCalendar ? 'narrow' : 'long' },
          },
        }}
        locale="ru"
        events={visibleEvents}
        eventContent={renderEventContent}
        allDayContent="Весь день"
        height="82vh"
        firstDay={1}
        timeZone="local"
        slotDuration="00:30:00"
        slotEventOverlap={!isMobileCalendar}
        eventMinHeight={isMobileCalendar ? 34 : 22}
        eventShortHeight={isMobileCalendar ? 26 : 18}
        displayEventTime
        displayEventEnd
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        dayMaxEvents
        eventMaxStack={isMobileCalendar ? 3 : 2}
        eventDisplay="block"
        expandRows
        fixedWeekCount={!isMobileCalendar}
        buttonText={{
          today: 'Сегодня',
          month: isMobileCalendar ? 'Мес' : 'Месяц',
          week: isMobileCalendar ? 'Нед' : 'Неделя',
          day: 'День',
          list: 'Список',
        }}
      />

      <div className="schedule-legend">
        {courses.map((course) => (
          <span key={course.id} className="schedule-legend-item">
            <span className="schedule-legend-dot" style={{ backgroundColor: getCourseColor(course.name) }} />
            {course.name}
          </span>
        ))}
      </div>

      {visibleEvents.length === 0 && (
        <div className="schedule-empty-state">
          Занятий не найдено. Попробуйте изменить фильтры или добавить новое занятие.
        </div>
      )}
    </section>
  );
};
