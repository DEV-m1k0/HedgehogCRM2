from __future__ import annotations

import logging
import os
import threading
from datetime import datetime, timedelta

from sqlalchemy.orm import Session, sessionmaker

from app.models import Lesson, StudyGroup, User
from app.services.email_service import notifications_enabled, send_plain_email, smtp_is_configured

_logger = logging.getLogger("hedgehog.reminders")
_worker_thread: threading.Thread | None = None
_stop_event: threading.Event | None = None


def _send_lesson_email(*, to_email: str, lesson: Lesson, group: StudyGroup, minutes_before: int) -> None:
    start_label = lesson.start_at.strftime("%d.%m.%Y %H:%M")
    subject = f"Напоминание: занятие через {minutes_before} мин"
    body = (
        f"Здравствуйте!\n\n"
        f"Скоро начнется занятие.\n"
        f"Тема: {lesson.topic}\n"
        f"Группа: {group.name}\n"
        f"Время начала: {start_label}\n"
        f"Тип занятия: {lesson.lesson_type}\n\n"
        f"Это автоматическое уведомление Hedgehog CRM."
    )
    send_plain_email(to_email=to_email, subject=subject, body=body)


def _process_due_reminders(db: Session) -> int:
    now = datetime.now()
    lessons = (
        db.query(Lesson, StudyGroup, User)
        .join(StudyGroup, StudyGroup.id == Lesson.group_id)
        .join(User, User.id == StudyGroup.teacher_id)
        .filter(
            Lesson.archived_at.is_(None),
            Lesson.is_cancelled.is_(False),
            Lesson.reminder_minutes_before.is_not(None),
            Lesson.reminder_sent_at.is_(None),
            Lesson.start_at > now,
            StudyGroup.archived_at.is_(None),
            User.is_accepted.is_(True),
        )
        .all()
    )

    sent_count = 0
    for lesson, group, teacher in lessons:
        if not teacher.email:
            continue
        minutes_before = max(int(lesson.reminder_minutes_before or 0), 0)
        remind_at = lesson.start_at - timedelta(minutes=minutes_before)
        if remind_at > now:
            continue
        try:
            _send_lesson_email(
                to_email=teacher.email,
                lesson=lesson,
                group=group,
                minutes_before=minutes_before,
            )
            lesson.reminder_sent_at = datetime.now()
            sent_count += 1
        except Exception:
            _logger.exception("lesson_reminder_send_failed lesson_id=%s teacher_id=%s", lesson.id, teacher.id)

    if sent_count:
        db.commit()
    return sent_count


def _worker_loop(session_factory: sessionmaker[Session], stop_event: threading.Event) -> None:
    _logger.info("lesson_reminder_worker_started")
    while not stop_event.is_set():
        db = session_factory()
        try:
            sent = _process_due_reminders(db)
            if sent:
                _logger.info("lesson_reminders_sent count=%s", sent)
        except Exception:
            db.rollback()
            _logger.exception("lesson_reminder_worker_cycle_failed")
        finally:
            db.close()
        stop_event.wait(30)
    _logger.info("lesson_reminder_worker_stopped")


def start_lesson_reminder_worker(session_factory: sessionmaker[Session]) -> None:
    global _worker_thread, _stop_event
    if not notifications_enabled():
        _logger.info("lesson_reminder_worker_disabled notifications_off")
        return
    if os.getenv("LESSON_REMINDERS_ENABLED", "1").strip().lower() in {"0", "false", "no"}:
        _logger.info("lesson_reminder_worker_disabled")
        return
    if _worker_thread and _worker_thread.is_alive():
        return
    if not smtp_is_configured():
        _logger.warning("lesson_reminder_smtp_not_configured SMTP_HOST/SMTP_FROM are required for email sending")
    _stop_event = threading.Event()
    _worker_thread = threading.Thread(
        target=_worker_loop,
        args=(session_factory, _stop_event),
        name="lesson-reminder-worker",
        daemon=True,
    )
    _worker_thread.start()


def stop_lesson_reminder_worker() -> None:
    global _worker_thread, _stop_event
    if _stop_event is not None:
        _stop_event.set()
    if _worker_thread and _worker_thread.is_alive():
        _worker_thread.join(timeout=2)
    _worker_thread = None
    _stop_event = None
