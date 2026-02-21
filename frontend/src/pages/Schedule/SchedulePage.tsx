import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import type { BaseEvent } from './Schedule.types';
import { useEffect, useMemo, useState } from 'react';

import './Schedule.css';
import ConfirmationModal from './Components/ConfirmationModal';
import { Input } from '../../components/common/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPen } from '@fortawesome/free-solid-svg-icons';
import { groupsApi, scheduleApi } from '../../api/crm';

interface GroupOption {
  id: number;
  name: string;
}

export const SchedulePage = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [groups, setGroups] = useState<GroupOption[]>([]);

  const [newLesson, setNewLesson] = useState({
    group_id: 0,
    topic: '',
    start_at: '',
    end_at: '',
  });

  const selectedGroupName = useMemo(() => groups.find((group) => group.id === newLesson.group_id)?.name ?? '', [groups, newLesson.group_id]);

  const load = async () => {
    const [lessonsRes, groupsRes] = await Promise.all([scheduleApi.lessons(), groupsApi.list()]);

    setGroups(groupsRes.data);
    if (!newLesson.group_id && groupsRes.data.length > 0) {
      setNewLesson((prev) => ({ ...prev, group_id: groupsRes.data[0].id }));
    }

    setEvents(
      lessonsRes.data.map((lesson) => ({
        id: String(lesson.id),
        title: lesson.topic,
        start: lesson.start_at,
        end: lesson.end_at,
        color: 'var(--primary)',
      })),
    );
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const handleDateClick = (info: DateClickArg) => {
    const start = `${info.dateStr}T10:00`;
    const end = `${info.dateStr}T11:00`;

    setNewLesson((prev) => ({
      ...prev,
      start_at: start,
      end_at: end,
      topic: prev.topic || 'Новое занятие',
    }));

    setIsModalCreateOpen(true);
  };

  const handleConfirmCreateEvent = async () => {
    if (!newLesson.group_id || !newLesson.topic || !newLesson.start_at || !newLesson.end_at) {
      return;
    }

    await scheduleApi.createLesson({
      group_id: newLesson.group_id,
      topic: newLesson.topic,
      start_at: new Date(newLesson.start_at).toISOString(),
      end_at: new Date(newLesson.end_at).toISOString(),
      comment: `Группа: ${selectedGroupName}`,
    });

    setIsModalCreateOpen(false);
    await load();
  };

  return (
    <div>
      <FullCalendar
        dateClick={handleDateClick}
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
        events={events}
        eventDisplay="block"
        allDayContent="Весь день"
        height="85vh"
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

      <ConfirmationModal
        isOpen={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
        onConfirm={handleConfirmCreateEvent}
        title="Создание занятия"
        confirmText="Создать"
        cancelText="Отмена"
        confirmVariant="primary"
        size="md"
      >
        <div style={{ display: 'grid', gap: '12px' }}>
          <label>
            Группа
            <select
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '6px' }}
              value={newLesson.group_id || ''}
              onChange={(e) => setNewLesson((prev) => ({ ...prev, group_id: Number(e.target.value) }))}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </label>

          <Input
            name="lessonTopic"
            value={newLesson.topic}
            onChangeField={(_, value) => setNewLesson((prev) => ({ ...prev, topic: String(value) }))}
            placeholder="Введите тему урока"
            label="Тема урока"
            type="text"
            icon={<FontAwesomeIcon icon={faPen} />}
          />
          <Input
            name="lessonStart"
            value={newLesson.start_at}
            onChangeField={(_, value) => setNewLesson((prev) => ({ ...prev, start_at: String(value) }))}
            label="Начало"
            type="datetime-local"
            icon={<FontAwesomeIcon icon={faCalendar} />}
          />
          <Input
            name="lessonEnd"
            value={newLesson.end_at}
            onChangeField={(_, value) => setNewLesson((prev) => ({ ...prev, end_at: String(value) }))}
            label="Окончание"
            type="datetime-local"
            icon={<FontAwesomeIcon icon={faCalendar} />}
          />
        </div>
      </ConfirmationModal>
    </div>
  );
};
