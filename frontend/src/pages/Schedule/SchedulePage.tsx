import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import type { BaseEvent } from './Schedule.types';
import { useState } from 'react';

import "./Schedule.css"
import ConfirmationModal from './Components/ConfirmationModal';
import { Input } from '../../components/common/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faPen } from '@fortawesome/free-solid-svg-icons';
import type { EventClickArg } from '@fullcalendar/core/index.js';


export const SchedulePage = () => {
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const [pendingEvent, setPendingEvent] = useState<BaseEvent | null>(null);

    const [events, setEvents] = useState<BaseEvent[]>([
        // {
        //     id: Date.now().toString(),
        //     title: 'Event 1',
        //     start: '2026-02-07T10:00:00',
        //     end: '2026-02-09T12:00:00',
        //     color: 'var(--primary)',
        //     editable: true,
        // }
    ])

    const handleOpenModal = () => {
        setIsModalCreateOpen(true)
    }

    const handleDateClick = (info: DateClickArg) => {
        handleOpenModal()

        console.log(info)

        const newEvent = {
            id: Date.now().toString(),
            title: 'Event 1',
            start: info.dateStr.toString(),
            end: info.dateStr.toString(),
            // startTime: '00:00',
            color: 'var(--primary)',
        }

        setPendingEvent(newEvent)
        setIsModalCreateOpen(true)
    }

    const handleConfirmCreateEvent = () => {
        if (pendingEvent) {
            const end = pendingEvent.end ? new Date(pendingEvent.end) : new Date(pendingEvent.start)
            end.setDate(end.getDate() + 1)
            const eventToAdd = { ...pendingEvent, end: end.toISOString().split('T')[0] }
            setEvents(prev => [...prev, eventToAdd])
            setPendingEvent(null)
        }
        setIsModalCreateOpen(false)
    }

    const handleCancelCreateEvent = () => {
        setPendingEvent(null)
        setIsModalCreateOpen(false)
    }

    const handleCancelEditEvent = () => {
        setPendingEvent(null)
        setIsModalEditOpen(false)
    }

    const handleConfirmEditEvent = () => {
        if (pendingEvent) {
            setEvents(events.map(ev => ev.id === pendingEvent.id ? pendingEvent : ev))
            setPendingEvent(null)
        }
        setIsModalEditOpen(false)
    }

    const handleOpenModalEdit = (event: BaseEvent) => {
        setIsModalEditOpen(true)
        setPendingEvent(event)
    }

    const handleEventClick = (info: EventClickArg) => {
        console.log(info.event)
        const event = events.find(ev => ev.id === info.event.id)
        if (event) {
            handleOpenModalEdit(event)
        }
        // console.log(info.event)
    }

    return (
        <div className="">
            <FullCalendar

            dateClick={handleDateClick}
            eventClick={handleEventClick}

            editable={true}
            selectable={true}
            droppable={true}

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
                isOpen={isModalCreateOpen}
                onClose={handleCancelCreateEvent}
                onConfirm={handleConfirmCreateEvent}
                title="Создание нового события"
                confirmText="Создать"
                cancelText="Отмена"
                confirmVariant="primary"
                size="md"
                children={
                    <>
                        <Input
                            name='eventTitle'
                            value={pendingEvent?.title || ''}
                            onChangeField={(name, value) => setPendingEvent(prev => prev ? { ...prev, title: String(value) } : null)}
                            placeholder="Введите название события"
                            label='Название события'
                            type='text'
                            icon={<FontAwesomeIcon icon={faPen}/>}
                        />
                        <Input
                            name='eventStartDate'
                            value={pendingEvent?.start.toString() || ''}
                            onChangeField={(name, value) => setPendingEvent(prev => prev ? { ...prev, start: String(value) } : null)}
                            placeholder="Введите дату начала события"
                            label='Дата начала события'
                            type='date'
                            icon={<FontAwesomeIcon icon={faCalendar}/>}
                        />
                        <Input
                            name='eventEndDate'
                            value={pendingEvent?.end?.toString() || ''}
                            onChangeField={(name, value) => setPendingEvent(prev => prev ? { ...prev, end: String(value) } : null)}
                            placeholder="Введите дату окончания события"
                            label='Дата окончания события'
                            type='date'
                            icon={<FontAwesomeIcon icon={faCalendar}/>}
                        />
                    </>
                }
            />
            <ConfirmationModal
                isOpen={isModalEditOpen}
                onClose={handleCancelEditEvent}
                onConfirm={handleConfirmEditEvent}
                title="Редактирование события"
                confirmText="Сохранить"
                cancelText="Отмена"
                confirmVariant="primary"
                size="md"
                children={
                    <>
                        <Input
                            name='eventTitle'
                            value={pendingEvent?.title || ''}
                            onChangeField={(name, value) => setPendingEvent(prev => prev ? { ...prev, title: String(value) } : null)}
                            placeholder="Введите название события"
                            label='Название события'
                            type='text'
                            icon={<FontAwesomeIcon icon={faPen}/>}
                        />
                        <Input
                            name='eventDate'
                            value={pendingEvent?.start.toString() || ''}
                            onChangeField={(name, value) => setPendingEvent(prev => prev ? { ...prev, start: String(value) } : null)}
                            placeholder="Введите дату события"
                            label='Дата события'
                            type='date'
                            icon={<FontAwesomeIcon icon={faCalendar}/>}
                        />
                        {/* <Input
                            name='eventTime'
                            value={pendingEvent?.startTime?.toString() || ''}
                            onChangeField={(name, value) => setPendingEvent(prev => prev ? { ...prev, startTime: String(value) } : null)}
                            placeholder="Введите время события"
                            label='Время события'
                            type='time'
                            icon={<FontAwesomeIcon icon={faClock}/>}
                        /> */}
                    </>
                }
            />
        </div>
    )
}