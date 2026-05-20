'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import type { BaseEvent } from './Schedule.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DatesSetArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core';
import { coursesApi, groupsApi, metaApi, scheduleApi } from '@/lib/api/crm';
import type { Course, User } from '@/types/crm.types';
import { useNotifications } from '@/components/feedback/Notifications';
import { loadTeacherSettings, type TeacherSettings } from '@/utils/teacherSettings';
import { useAppLanguage } from '@/i18n/AppLanguage';

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
  const router = useRouter();
  const { notify } = useNotifications();
  const { language } = useAppLanguage();
  const isEn = language === 'en';
  const calendarRef = useRef<FullCalendar | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const currentUser = useMemo(() => getCurrentUser(), []);
  const roleRaw = typeof currentUser?.role === 'string' ? currentUser.role : currentUser?.role?.name ?? '';
  const roleName = roleRaw.toLowerCase();
  const isTeacher = roleName.includes('преподаватель') || roleName.includes('teacher');
  const isManager = roleName.includes('менеджер') || roleName.includes('manager');
  const isAdmin = roleName.includes('администратор') || roleName.includes('admin');

  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | 'all'>(() => (isTeacher && currentUser ? currentUser.id : 'all'));
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [currentViewType, setCurrentViewType] = useState('dayGridMonth');
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>(() => loadTeacherSettings(currentUser));

  useEffect(() => {
    if (isTeacher && currentUser) {
      setSelectedTeacherId(currentUser.id);
    }
  }, [isTeacher, currentUser]);

  useEffect(() => {
    const syncSettings = () => setTeacherSettings(loadTeacherSettings(currentUser));
    syncSettings();
    window.addEventListener('storage', syncSettings);
    window.addEventListener('teacher-settings-updated', syncSettings as EventListener);
    return () => {
      window.removeEventListener('storage', syncSettings);
      window.removeEventListener('teacher-settings-updated', syncSettings as EventListener);
    };
  }, [currentUser]);

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
        if (isTeacher && !teacherSettings.showCancelledLessons && lesson.is_cancelled) {
          return false;
        }
        return true;
      })
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
        const fullTitle = `${courseName}: ${lesson.topic}`;
        const shortTitle = lesson.topic;

        return {
          id: String(lesson.id),
          title: fullTitle,
          start: lesson.start_at,
          end: lesson.end_at,
          color,
          extendedProps: {
            eventKind: 'lesson',
            lessonType: lesson.lesson_type,
            isCancelled: lesson.is_cancelled,
            isConducted: lesson.is_conducted,
            shortTitle,
            fullTitle,
            courseName,
            isRecurringWeekly: lesson.is_recurring_weekly,
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
  }, [selectedTeacherId, teacherSettings.showCancelledLessons, isTeacher]);

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
    router.push(`/calendar/new?${params.toString()}`);
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
        router.push(`/calendar/new?${params.toString()}`);
        return;
      }
      const params = new URLSearchParams();
      const makeupTeacherId = info.event.extendedProps?.makeupTeacherId as number | null | undefined;
      const makeupGroupId = info.event.extendedProps?.makeupGroupId as number | null | undefined;
      const makeupAt = info.event.extendedProps?.makeupAt as string | undefined;
      if (makeupTeacherId) {
        params.set('teacherId', String(makeupTeacherId));
      }
      if (makeupGroupId) {
        params.set('makeupGroupId', String(makeupGroupId));
      }
      if (makeupAt) {
        params.set('date', makeupAt.slice(0, 10));
        params.set('makeupAt', makeupAt);
      }
      params.set('mode', 'makeup-attendance');
      router.push(`/calendar/new?${params.toString()}`);
      return;
    }
    router.push(`/calendar/${info.event.id}/edit`);
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
      notify('success', isEn ? 'Lesson moved' : 'Занятие перенесено', isEn ? 'New lesson time has been saved.' : 'Новое время занятия сохранено.');
      await load();
    } catch (error) {
      console.error(error);
      info.revert();
      notify('error', isEn ? 'Error' : 'Ошибка', isEn ? 'Failed to save lesson time.' : 'Не удалось сохранить новое время занятия.');
    }
  };

  const renderEventContent = (info: EventContentArg) => {
    const isTimeGridView = info.view.type.startsWith('timeGrid');
    const isMonthView = info.view.type === 'dayGridMonth';
    const isListView = info.view.type.startsWith('list');
    const timeText = info.timeText || (info.event.start
      ? info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      : '');
    const lessonType = (info.event.extendedProps?.lessonType as string | undefined) ?? 'group';
    const typeLabelShort = lessonType === 'individual'
      ? (isEn ? 'Ind.' : 'Инд.')
      : lessonType === 'makeup'
        ? (isEn ? 'Mkp.' : 'Отр.')
        : (isEn ? 'Grp.' : 'Гр.');
    const typeLabelLong = lessonType === 'individual'
      ? (isEn ? 'Individual' : 'Индивидуальное')
      : lessonType === 'makeup'
        ? (isEn ? 'Makeup' : 'Отработка')
        : (isEn ? 'Group' : 'Групповое');
    const isCancelled = Boolean(info.event.extendedProps?.isCancelled);
    const isConducted = Boolean(info.event.extendedProps?.isConducted);
    const statusLabel = isCancelled ? (isEn ? 'Cancelled' : 'Отменено') : isConducted ? (isEn ? 'Conducted' : 'Проведено') : '';
    const shortTitle = (info.event.extendedProps?.shortTitle as string | undefined) ?? info.event.title;
    const fullTitle = (info.event.extendedProps?.fullTitle as string | undefined) ?? info.event.title;
    const isRecurringWeekly = Boolean(info.event.extendedProps?.isRecurringWeekly);
    const displayTitle = isTeacher
      ? (
        teacherSettings.eventTitleMode === 'short' || !teacherSettings.showCourseInTitle
          ? shortTitle
          : fullTitle
      )
      : info.event.title;
    const listTimeLabel = timeText || (isEn ? 'Time not set' : 'Время не указано');
    const indicatorColor = info.event.backgroundColor || info.event.borderColor || '#64748b';
    const titleLinesClass = `calendar-event-title--lines-${isTeacher ? teacherSettings.eventTitleLines : 2}`;
    const isMakeup = lessonType === 'makeup';

    if (isMakeup) {
      if (isListView) {
        return (
          <div className="calendar-list-event calendar-list-event--time-only">
            <div className="calendar-list-event-time-wrap">
              <div className="calendar-list-event-time">{listTimeLabel}</div>
              <span className="calendar-event-makeup-chip">{isEn ? 'Makeup' : 'Отработка'}</span>
            </div>
          </div>
        );
      }
      return (
        <div className="calendar-event-inner calendar-event-inner--time-only">
          <div className="calendar-event-time-wrap">
            <div className="calendar-event-time">{listTimeLabel}</div>
            <span className="calendar-event-makeup-chip">{isEn ? 'Makeup' : 'Отработка'}</span>
          </div>
        </div>
      );
    }

    if (isListView) {
      return (
        <div className={`calendar-list-event ${isTeacher && teacherSettings.dimConductedEvents && isConducted ? 'calendar-list-event--muted' : ''}`}>
          <div className="calendar-list-event-top">
            <div className="calendar-list-event-head-left">
              <span className="calendar-list-event-indicator" style={{ backgroundColor: indicatorColor }} />
              {( !isTeacher || teacherSettings.showEventTime ) ? <span className="calendar-list-event-time">{listTimeLabel}</span> : null}
            </div>
            <div className="calendar-list-event-badges">
              {(!isTeacher || teacherSettings.showEventTypeBadges) ? (
                <span className={`calendar-event-type calendar-event-type--${lessonType}`}>{typeLabelLong}</span>
              ) : null}
              {(!isTeacher || teacherSettings.showRecurringBadge) && isRecurringWeekly ? (
                <span className="calendar-event-recurring">{isEn ? 'Recurring' : 'Повтор'}</span>
              ) : null}
              {(!isTeacher || teacherSettings.showEventStatusBadges) && statusLabel ? (
                <span className="calendar-event-status">{statusLabel}</span>
              ) : null}
            </div>
          </div>
          <div className={`calendar-list-event-title ${titleLinesClass}`}>{displayTitle}</div>
        </div>
      );
    }

    return (
      <div className={`calendar-event-inner ${isTimeGridView ? 'calendar-event-inner--timegrid' : ''} ${isTeacher && teacherSettings.dimConductedEvents && isConducted ? 'calendar-event-inner--muted' : ''}`}>
        {( !isTeacher || teacherSettings.showEventTime ) && timeText ? <div className="calendar-event-time">{timeText}</div> : null}
        {!isTimeGridView && (!isTeacher || teacherSettings.showEventTypeBadges || teacherSettings.showEventStatusBadges) ? (
          <div className="calendar-event-meta">
            {(!isTeacher || teacherSettings.showEventTypeBadges) ? (
              <span className={`calendar-event-type calendar-event-type--${lessonType}`}>{typeLabelShort}</span>
            ) : null}
            {(!isTeacher || teacherSettings.showRecurringBadge) && isRecurringWeekly ? <span className="calendar-event-recurring">{isEn ? 'Recurring' : 'Повтор'}</span> : null}
            {(!isTeacher || teacherSettings.showEventStatusBadges) && statusLabel ? <span className="calendar-event-status">{statusLabel}</span> : null}
          </div>
        ) : null}
        <div className={`calendar-event-title ${titleLinesClass}`}>
          {(isTimeGridView || isMonthView) && (!isTeacher || teacherSettings.showEventTypeBadges)
            ? <span className={`calendar-event-type-inline calendar-event-type-inline--${lessonType}`}>{typeLabelShort}</span>
            : null}
          {displayTitle}
        </div>
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
  const isMonthView = currentViewType === 'dayGridMonth';
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
      api.changeView(teacherSettings.mobileView);
    }
  }, [isMobileCalendar, teacherSettings.mobileView]);

  const initialView = isTeacher
    ? (isMobileCalendar ? teacherSettings.mobileView : teacherSettings.desktopView)
    : (isMobileCalendar ? 'timeGridWeek' : 'dayGridMonth');

  return (
    <section className="schedule-page" ref={containerRef}>
      <div className={`schedule-toolbar ${isManager ? 'schedule-toolbar--manager' : ''}`}>
        {isManager ? (
          <>
            <div className="schedule-controls schedule-controls--search">
              <label htmlFor="scheduleSearch">{isEn ? 'Search lessons' : 'Поиск по занятиям'}</label>
              <input
                id="scheduleSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isEn ? 'Topic, course, status...' : 'Тема, курс, отметка статуса...'}
              />
              <small>{isEn ? 'Click a day in calendar to add a lesson.' : 'Нажмите на день календаря, чтобы добавить новое занятие.'}</small>
            </div>

            {!isTeacher && (
              <div className="schedule-controls schedule-controls--teacher">
                <label htmlFor="teacherFilter">{isEn ? 'Teacher' : 'Преподаватель'}</label>
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
                  <option value="all">{isEn ? 'All teachers' : 'Все преподаватели'}</option>
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
                <label htmlFor="teacherFilter">{isEn ? 'Teacher' : 'Преподаватель'}</label>
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
                  <option value="all">{isEn ? 'All teachers' : 'Все преподаватели'}</option>
                  {teacherOptions.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.second_name} {teacher.first_name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="schedule-controls schedule-controls--search">
              <label htmlFor="scheduleSearch">{isEn ? 'Search lessons' : 'Поиск по занятиям'}</label>
              <input
                id="scheduleSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isEn ? 'Topic, course, status...' : 'Тема, курс, отметка статуса...'}
              />
              <small>{isEn ? 'Click a day in calendar to add a lesson.' : 'Нажмите на день календаря, чтобы добавить новое занятие.'}</small>
            </div>
          </>
        )}
      </div>

      {!isTeacher && (
        <div className="schedule-mobile-filter">
          <label htmlFor="teacherFilterMobile">{isEn ? 'Teacher' : 'Преподаватель'}</label>
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
            <option value="all">{isEn ? 'All teachers' : 'Все преподаватели'}</option>
            {teacherOptions.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.second_name} {teacher.first_name}
              </option>
            ))}
          </select>
        </div>
      )}

      <FullCalendar
        key={`calendar-${isTeacher ? 'teacher' : 'other'}-${isMobileCalendar ? 'mobile' : 'desktop'}-${initialView}-${teacherSettings.slotDuration}-${teacherSettings.snapDuration}-${teacherSettings.firstDay}-${teacherSettings.timeFormat}-${teacherSettings.showWeekends}-${teacherSettings.denseEvents}-${teacherSettings.dayStartTime}-${teacherSettings.dayEndTime}-${teacherSettings.initialScrollTime}-${teacherSettings.monthEventRows}-${teacherSettings.showNowIndicator}`}
        ref={calendarRef}
        datesSet={(arg: DatesSetArg) => setCurrentViewType(arg.view.type)}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        editable
        eventStartEditable
        eventDurationEditable={false}
        fixedMirrorParent={document.body}
        selectable
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={initialView}
        headerToolbar={calendarHeaderToolbar}
        views={{
          timeGridWeek: {
            dayHeaderFormat: { weekday: isMobileCalendar ? 'short' : 'long' },
          },
          dayGridMonth: {
            dayHeaderFormat: { weekday: isMobileCalendar ? 'narrow' : 'long' },
            dayMaxEventRows: isTeacher ? teacherSettings.monthEventRows : 2,
            height: 'auto',
            contentHeight: 'auto',
          },
        }}
        locale={isEn ? 'en' : 'ru'}
        events={visibleEvents}
        eventContent={renderEventContent}
        allDayContent="Весь день"
        height={isMonthView ? 'auto' : '82vh'}
        firstDay={isTeacher ? teacherSettings.firstDay : 1}
        weekends={isTeacher ? teacherSettings.showWeekends : true}
        timeZone="local"
        slotDuration={isTeacher ? teacherSettings.slotDuration : '00:30:00'}
        snapDuration={isTeacher ? teacherSettings.snapDuration : '00:15:00'}
        slotMinTime={isTeacher ? teacherSettings.dayStartTime : '00:00:00'}
        slotMaxTime={isTeacher ? teacherSettings.dayEndTime : '24:00:00'}
        scrollTime={isTeacher ? teacherSettings.initialScrollTime : '08:00:00'}
        nowIndicator={isTeacher ? teacherSettings.showNowIndicator : true}
        slotEventOverlap={!isMobileCalendar}
        eventMinHeight={isMobileCalendar ? 34 : 22}
        eventShortHeight={isMobileCalendar ? 26 : 18}
        displayEventTime
        displayEventEnd
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: isTeacher ? teacherSettings.timeFormat === '12h' : false,
        }}
        eventMaxStack={isTeacher ? (teacherSettings.denseEvents ? 4 : (isMobileCalendar ? 3 : 2)) : (isMobileCalendar ? 3 : 2)}
        eventDisplay="block"
        expandRows
        fixedWeekCount={!isMobileCalendar}
        buttonText={{
          today: isEn ? 'Today' : 'Сегодня',
          month: isEn ? (isMobileCalendar ? 'Mon' : 'Month') : (isMobileCalendar ? 'Мес' : 'Месяц'),
          week: isEn ? (isMobileCalendar ? 'Wk' : 'Week') : (isMobileCalendar ? 'Нед' : 'Неделя'),
          day: isEn ? 'Day' : 'День',
          list: isEn ? 'List' : 'Список',
        }}
      />

      {(!isTeacher || teacherSettings.showLegend) && (
        <div className="schedule-legend">
          {courses.map((course) => (
            <span key={course.id} className="schedule-legend-item">
              <span className="schedule-legend-dot" style={{ backgroundColor: getCourseColor(course.name) }} />
              {course.name}
            </span>
          ))}
        </div>
      )}

      {visibleEvents.length === 0 && (
        <div className="schedule-empty-state">
          {isEn
            ? 'No lessons found. Try changing filters or add a new lesson.'
            : 'Занятий не найдено. Попробуйте изменить фильтры или добавить новое занятие.'}
        </div>
      )}
    </section>
  );
};
