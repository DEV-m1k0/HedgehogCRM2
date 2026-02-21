import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import type { BaseEvent } from './Schedule.types';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EventClickArg } from '@fullcalendar/core';
import { coursesApi, groupsApi, metaApi, scheduleApi } from '../../api/crm';
import type { Course, User } from '../../types/crm.types';

import './Schedule.css';

const COURSE_COLORS = ['#4c9f70', '#2d7dd2', '#ff7f50', '#f7b32b', '#7a5cff', '#9c6644', '#2a9d8f', '#e76f51'];

const hashString = (value: string): number => value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

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
  const currentUser = getCurrentUser();
  const isTeacher = currentUser?.role?.name?.toLowerCase() === 'преподаватель';

  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | 'all'>(() => (isTeacher && currentUser ? currentUser.id : 'all'));

  useEffect(() => {
    if (isTeacher && currentUser) {
      setSelectedTeacherId(currentUser.id);
    }
  }, [isTeacher, currentUser]);

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
        const statusLabel = lesson.is_cancelled ? '[Отменено] ' : lesson.is_conducted ? '[Проведено] ' : '';

        return {
          id: String(lesson.id),
          title: `${statusLabel}${courseName}: ${lesson.topic}${recurringLabel}`,
          start: lesson.start_at,
          end: lesson.end_at,
          color,
        } satisfies BaseEvent;
      });

    const renderedMakeupEvents = makeupsRes.data.map((makeup) => {
      const startDate = new Date(makeup.makeup_lesson_at);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      return {
        id: `makeup-${makeup.attendance_id}`,
        title: `${makeup.makeup_completed ? '[Done]' : '[Makeup]'} Отработка: ${makeup.client_full_name}`,
        start: makeup.makeup_lesson_at,
        end: endDate.toISOString(),
        color: makeup.makeup_completed ? '#16a34a' : '#dc2626',
        extendedProps: {
          eventKind: 'makeup',
          clientId: makeup.client_id,
        },
      } satisfies BaseEvent;
    });

    setEvents([...renderedLessonEvents, ...renderedMakeupEvents]);
  };

  useEffect(() => {
    load().catch(console.error);
  }, [selectedTeacherId]);

  const handleDateClick = (info: DateClickArg) => {
    const params = new URLSearchParams({ date: info.dateStr });
    if (selectedTeacherId !== 'all') {
      params.set('teacherId', String(selectedTeacherId));
    }
    navigate(`/calendar/new?${params.toString()}`);
  };

  const handleEventClick = (info: EventClickArg) => {
    if (String(info.event.id).startsWith('makeup-')) {
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

  const visibleEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return events;
    }
    return events.filter((event) => event.title.toLowerCase().includes(term));
  }, [events, searchTerm]);

  return (
    <section className="schedule-page">
      <div className="schedule-toolbar">
        <div className="schedule-left-controls">
          {!isTeacher && (
            <div className="schedule-controls">
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

          <div className="schedule-controls">
            <label htmlFor="scheduleSearch">Поиск занятия</label>
            <input
              id="scheduleSearch"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Тема, курс..."
            />
          </div>
        </div>

        <button type="button" className="schedule-create-btn" onClick={() => navigate('/calendar/new')}>
          Добавить занятие
        </button>
      </div>

      <FullCalendar
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={false}
        selectable
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        views={{
          timeGridWeek: {
            dayHeaderFormat: { weekday: 'long' },
          },
          dayGridMonth: {
            dayHeaderFormat: { weekday: 'long' },
          },
        }}
        locale="ru"
        events={visibleEvents}
        eventDisplay="block"
        allDayContent="Весь день"
        height="82vh"
        firstDay={1}
        timeZone="local"
        slotDuration="00:30:00"
        displayEventTime
        displayEventEnd
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        dayMaxEvents
        eventMaxStack={2}
        buttonText={{
          today: 'Сегодня',
          month: 'Месяц',
          week: 'Неделя',
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
