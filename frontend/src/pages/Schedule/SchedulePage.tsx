import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import type { BaseEvent } from './Schedule.types';
import { useState } from 'react';

import "./Schedule.css"
import ConfirmationModal from './Components/ConfirmationModal';


export const SchedulePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [events, setEvents] = useState<BaseEvent[]>([
        {
            id: Date.now().toString(),
            title: 'Event 1',
            start: '2026-02-07T10:00:00',
            // end: '2026-02-07T12:00:00',
            allDay: false,
            color: 'var(--primary)'
        }
    ])

    const createEvent = () => {
        console.log("create event")
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleDateClick = (info: DateClickArg) => {
        handleOpenModal()

        console.log(info)
        const newEvent = {
            id: Date.now().toString(),
            title: 'Event 1',
            start: info.dateStr,
            allDay: false,
            color: 'var(--primary)'
        }

        setEvents([...events, newEvent])
    }


    return (
        <div className="">
            <FullCalendar

            dateClick={handleDateClick}

            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}

            initialView='dayGridMonth'

            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}

            views={{
                timeGridWeek: {
                    dayHeaderFormat: { weekday: "long" }
                },
                dayGridMonth: {
                    dayHeaderFormat: { weekday: "long" }
                }
            }}

            locale={'ru'}

            events={events}
            eventDisplay="block"

            allDayContent="Весь день"

            height="85vh"

            firstDay={1}

            timeZone='local'

            // slotMinTime={'08:00:00'}
            // slotMaxTime={'21:00:00'}
            slotDuration={'00:30:00'}
            
            editable={true}
            selectable={true}
            droppable={true}

            displayEventTime={true}
            displayEventEnd={true}
            eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }}
            dayMaxEvents={true}
            eventMaxStack={2}
            buttonText={{
                today: "Сегодня",
                month: "Месяц",
                week: "Неделя",
                day: "День",
                list: "Список"
            }}
            />

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => true}
                title="Создание нового элемента"
                message="Вы уверены, что хотите создать новый элемент? Это действие нельзя будет отменить."
                confirmText="Создать"
                cancelText="Отмена"
                confirmVariant="primary"
                size="md"
            />
        </div>
    )
}