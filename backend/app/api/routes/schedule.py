from datetime import datetime, timedelta, timezone
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db import get_db
from app.models import Attendance, Client, Lesson, StudyGroup, User
from app.schemas import (
    AttendanceRead,
    AttendanceUpsert,
    LessonCreate,
    LessonRead,
    LessonUpdate,
    MakeupAssignIn,
    MakeupCalendarEventRead,
    MakeupItemRead,
)

router = APIRouter()


def _to_utc_naive(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value
    return value.astimezone(timezone.utc).replace(tzinfo=None)


def _is_teacher(user: User) -> bool:
    role_name = (user.role.name if user.role else "").lower()
    return "преподаватель" in role_name or "teacher" in role_name


def _is_manager_or_admin(user: User) -> bool:
    role_name = (user.role.name if user.role else "").lower()
    return "менеджер" in role_name or "manager" in role_name or "администратор" in role_name or "admin" in role_name


def _sync_lesson_conducted_state(lesson: Lesson) -> None:
    now = datetime.now()
    lesson.is_conducted = bool((not lesson.is_cancelled) and (_to_utc_naive(lesson.end_at) <= _to_utc_naive(now)))


def _resolve_cancel_marker_id(db: Session, lesson: Lesson, current_user: User) -> int | None:
    if _is_teacher(current_user):
        return current_user.id

    group = db.get(StudyGroup, lesson.group_id)
    if group and group.teacher_id:
        teacher = db.get(User, group.teacher_id)
        if teacher and _is_teacher(teacher):
            return teacher.id
    return None


def _sync_cancelled_attendance(
    db: Session,
    lesson: Lesson,
    *,
    is_cancelled: bool,
    marker_user_id: int | None,
) -> None:
    group = db.get(StudyGroup, lesson.group_id)
    if not group:
        return

    students = [student for student in group.students if student.archived_at is None]
    for student in students:
        attendance = (
            db.query(Attendance)
            .filter(
                Attendance.lesson_id == lesson.id,
                Attendance.client_id == student.id,
            )
            .first()
        )

        if is_cancelled:
            if attendance is None:
                attendance = Attendance(
                    lesson_id=lesson.id,
                    client_id=student.id,
                    status="absent",
                    comment="Занятие отменено",
                    hedgehogs=0,
                    auto_marked_cancelled=True,
                    absent_marked_by_user_id=marker_user_id,
                    makeup_lesson_at=None,
                    makeup_teacher_id=None,
                    makeup_comment=None,
                    makeup_completed=False,
                )
                db.add(attendance)
            else:
                attendance.status = "absent"
                attendance.auto_marked_cancelled = True
                if marker_user_id is not None:
                    attendance.absent_marked_by_user_id = marker_user_id
                if not attendance.comment:
                    attendance.comment = "Занятие отменено"
        elif attendance and attendance.auto_marked_cancelled:
            attendance.auto_marked_cancelled = False
            attendance.status = "present"
            if attendance.comment == "Занятие отменено":
                attendance.comment = None
            attendance.absent_marked_by_user_id = None
            attendance.makeup_lesson_at = None
            attendance.makeup_teacher_id = None
            attendance.makeup_comment = None
            attendance.makeup_completed = False


@router.get("/lessons", response_model=list[LessonRead])
def list_lessons(teacher_id: int | None = Query(default=None), db: Session = Depends(get_db)) -> list[Lesson]:
    query = db.query(Lesson).filter(Lesson.archived_at.is_(None))

    if teacher_id is not None:
        query = query.join(StudyGroup, StudyGroup.id == Lesson.group_id).filter(
            StudyGroup.teacher_id == teacher_id,
            StudyGroup.archived_at.is_(None),
        )

    lessons = query.order_by(Lesson.start_at.desc()).all()
    for lesson in lessons:
        _sync_lesson_conducted_state(lesson)
    return lessons


@router.post("/lessons", response_model=LessonRead, status_code=status.HTTP_201_CREATED)
def create_lesson(
    payload: LessonCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Lesson:
    start_at = _to_utc_naive(payload.start_at)
    end_at = _to_utc_naive(payload.end_at)

    if end_at <= start_at:
        raise HTTPException(status_code=400, detail="Время окончания должно быть позже времени начала")
    if payload.is_recurring_weekly and payload.recurrence_until and payload.recurrence_until < start_at.date():
        raise HTTPException(status_code=400, detail="Дата завершения повтора не может быть раньше даты первого занятия")

    recurrence_group_id: str | None = None
    if payload.is_recurring_weekly and payload.recurrence_until:
        recurrence_group_id = str(uuid4())

    lesson = Lesson(
        group_id=payload.group_id,
        topic=payload.topic,
        start_at=start_at,
        end_at=end_at,
        materials_url=payload.materials_url,
        comment=payload.comment,
        is_cancelled=payload.is_cancelled,
        is_recurring_weekly=payload.is_recurring_weekly,
        recurrence_group_id=recurrence_group_id,
    )
    _sync_lesson_conducted_state(lesson)
    db.add(lesson)
    created_lessons: list[Lesson] = [lesson]

    if payload.is_recurring_weekly and payload.recurrence_until:
        next_start = start_at + timedelta(weeks=1)
        next_end = end_at + timedelta(weeks=1)

        while next_start.date() <= payload.recurrence_until:
            recurring_lesson = Lesson(
                group_id=payload.group_id,
                topic=payload.topic,
                start_at=next_start,
                end_at=next_end,
                materials_url=payload.materials_url,
                comment=payload.comment,
                is_cancelled=payload.is_cancelled,
                is_recurring_weekly=True,
                recurrence_group_id=recurrence_group_id,
            )
            _sync_lesson_conducted_state(recurring_lesson)
            db.add(recurring_lesson)
            created_lessons.append(recurring_lesson)
            next_start += timedelta(weeks=1)
            next_end += timedelta(weeks=1)

    if payload.is_cancelled:
        db.flush()
        for created in created_lessons:
            marker_user_id = _resolve_cancel_marker_id(db, created, current_user)
            _sync_cancelled_attendance(db, created, is_cancelled=True, marker_user_id=marker_user_id)

    db.commit()
    db.refresh(lesson)
    _sync_lesson_conducted_state(lesson)
    return lesson


@router.get("/lessons/{lesson_id}", response_model=LessonRead)
def get_lesson(lesson_id: int, db: Session = Depends(get_db)) -> Lesson:
    lesson = db.get(Lesson, lesson_id)
    if not lesson or lesson.archived_at is not None:
        raise HTTPException(status_code=404, detail="Занятие не найдено")
    _sync_lesson_conducted_state(lesson)
    return lesson


@router.put("/lessons/{lesson_id}", response_model=LessonRead)
def update_lesson(
    lesson_id: int,
    payload: LessonUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Lesson:
    lesson = db.get(Lesson, lesson_id)
    if not lesson or lesson.archived_at is not None:
        raise HTTPException(status_code=404, detail="Занятие не найдено")

    values = payload.model_dump(exclude_unset=True)
    apply_to_future = values.pop("apply_to_future", False)
    original_start = _to_utc_naive(lesson.start_at)
    original_end = _to_utc_naive(lesson.end_at)

    if "start_at" in values and values["start_at"] is not None:
        values["start_at"] = _to_utc_naive(values["start_at"])
    if "end_at" in values and values["end_at"] is not None:
        values["end_at"] = _to_utc_naive(values["end_at"])

    targets: list[Lesson] = [lesson]
    if apply_to_future and lesson.recurrence_group_id:
        targets = (
            db.query(Lesson)
            .filter(
                Lesson.recurrence_group_id == lesson.recurrence_group_id,
                Lesson.start_at >= lesson.start_at,
                Lesson.archived_at.is_(None),
            )
            .all()
        )

    has_start_at = "start_at" in values and values["start_at"] is not None
    has_end_at = "end_at" in values and values["end_at"] is not None
    has_cancelled = "is_cancelled" in values and values["is_cancelled"] is not None
    start_delta = values["start_at"] - original_start if has_start_at else None
    end_delta = values["end_at"] - original_end if has_end_at else None

    for target in targets:
        for field_name, field_value in values.items():
            if apply_to_future and field_name in {"start_at", "end_at"}:
                continue
            setattr(target, field_name, field_value)

        if apply_to_future:
            if has_start_at and start_delta is not None:
                target.start_at = _to_utc_naive(target.start_at) + start_delta
            if has_end_at and end_delta is not None:
                target.end_at = _to_utc_naive(target.end_at) + end_delta

        if _to_utc_naive(target.end_at) <= _to_utc_naive(target.start_at):
            raise HTTPException(status_code=400, detail="Время окончания должно быть позже времени начала")
        _sync_lesson_conducted_state(target)

        if has_cancelled:
            marker_user_id = _resolve_cancel_marker_id(db, target, current_user)
            _sync_cancelled_attendance(
                db,
                target,
                is_cancelled=bool(values["is_cancelled"]),
                marker_user_id=marker_user_id,
            )

    db.commit()
    db.refresh(lesson)
    _sync_lesson_conducted_state(lesson)
    return lesson


@router.delete("/lessons/{lesson_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lesson(
    lesson_id: int,
    delete_future: bool = Query(default=False),
    delete_scope: str = Query(default="single"),
    db: Session = Depends(get_db),
) -> None:
    lesson = db.get(Lesson, lesson_id)
    if not lesson or lesson.archived_at is not None:
        raise HTTPException(status_code=404, detail="Занятие не найдено")

    scope = delete_scope
    if delete_future and scope == "single":
        scope = "future"

    if scope not in {"single", "future", "all"}:
        raise HTTPException(status_code=400, detail="Некорректный режим удаления")

    if scope == "future" and lesson.recurrence_group_id:
        for item in (
            db.query(Lesson)
            .filter(
                Lesson.recurrence_group_id == lesson.recurrence_group_id,
                Lesson.start_at >= lesson.start_at,
                Lesson.archived_at.is_(None),
            )
            .all()
        ):
            item.archived_at = datetime.utcnow()
    elif scope == "all" and lesson.recurrence_group_id:
        for item in (
            db.query(Lesson)
            .filter(
                Lesson.recurrence_group_id == lesson.recurrence_group_id,
                Lesson.archived_at.is_(None),
            )
            .all()
        ):
            item.archived_at = datetime.utcnow()
    else:
        lesson.archived_at = datetime.utcnow()

    db.commit()


@router.post("/lessons/{lesson_id}/restore", response_model=LessonRead)
def restore_lesson(
    lesson_id: int,
    restore_scope: str = Query(default="single"),
    db: Session = Depends(get_db),
) -> Lesson:
    lesson = db.get(Lesson, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Занятие не найдено")

    if restore_scope not in {"single", "future", "all"}:
        raise HTTPException(status_code=400, detail="Некорректный режим восстановления")

    if restore_scope == "future" and lesson.recurrence_group_id:
        for item in (
            db.query(Lesson)
            .filter(
                Lesson.recurrence_group_id == lesson.recurrence_group_id,
                Lesson.start_at >= lesson.start_at,
            )
            .all()
        ):
            item.archived_at = None
    elif restore_scope == "all" and lesson.recurrence_group_id:
        for item in db.query(Lesson).filter(Lesson.recurrence_group_id == lesson.recurrence_group_id).all():
            item.archived_at = None
    else:
        lesson.archived_at = None

    db.commit()
    db.refresh(lesson)
    return lesson


@router.get("/lessons/{lesson_id}/attendance", response_model=list[AttendanceRead])
def list_lesson_attendance(lesson_id: int, db: Session = Depends(get_db)) -> list[Attendance]:
    lesson = db.get(Lesson, lesson_id)
    if not lesson or lesson.archived_at is not None:
        raise HTTPException(status_code=404, detail="Занятие не найдено")
    return db.query(Attendance).filter(Attendance.lesson_id == lesson_id).order_by(Attendance.id).all()


@router.put("/lessons/{lesson_id}/attendance", response_model=AttendanceRead)
def upsert_attendance(
    lesson_id: int,
    payload: AttendanceUpsert,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Attendance:
    lesson = db.get(Lesson, lesson_id)
    if not lesson or lesson.archived_at is not None:
        raise HTTPException(status_code=404, detail="Занятие не найдено")

    if payload.makeup_teacher_id is not None:
        teacher = db.get(User, payload.makeup_teacher_id)
        if not teacher:
            raise HTTPException(status_code=400, detail="Преподаватель для отработки не найден")

    if payload.makeup_teacher_id is not None and payload.makeup_lesson_at is None:
        raise HTTPException(status_code=400, detail="Укажите дату отработки")
    if payload.makeup_lesson_at is not None and payload.makeup_teacher_id is None:
        raise HTTPException(status_code=400, detail="Укажите преподавателя для отработки")

    makeup_change_requested = (
        payload.makeup_lesson_at is not None
        or payload.makeup_teacher_id is not None
        or bool(payload.makeup_comment)
        or payload.makeup_completed
    )
    if makeup_change_requested and not _is_manager_or_admin(current_user):
        raise HTTPException(status_code=403, detail="Назначать отработки может только менеджер или администратор")

    attendance = (
        db.query(Attendance)
        .filter(Attendance.lesson_id == lesson_id, Attendance.client_id == payload.client_id)
        .first()
    )

    if attendance:
        attendance.status = payload.status
        if payload.status != "absent":
            attendance.auto_marked_cancelled = False
        attendance.comment = payload.comment
        attendance.hedgehogs = payload.hedgehogs
        if payload.status == "absent":
            if _is_teacher(current_user):
                attendance.absent_marked_by_user_id = current_user.id
                attendance.auto_marked_cancelled = False
        else:
            attendance.absent_marked_by_user_id = None
            attendance.makeup_lesson_at = None
            attendance.makeup_teacher_id = None
            attendance.makeup_comment = None
            attendance.makeup_completed = False
        attendance.makeup_lesson_at = _to_utc_naive(payload.makeup_lesson_at) if payload.makeup_lesson_at else None
        attendance.makeup_teacher_id = payload.makeup_teacher_id
        attendance.makeup_comment = payload.makeup_comment
        attendance.makeup_completed = payload.makeup_completed
    else:
        data = payload.model_dump()
        if data.get("makeup_lesson_at"):
            data["makeup_lesson_at"] = _to_utc_naive(data["makeup_lesson_at"])
        data["auto_marked_cancelled"] = False
        data["absent_marked_by_user_id"] = current_user.id if payload.status == "absent" and _is_teacher(current_user) else None
        attendance = Attendance(lesson_id=lesson_id, **data)
        db.add(attendance)

    if makeup_change_requested:
        if payload.status != "absent":
            raise HTTPException(status_code=400, detail="Отработку можно назначить только для пропущенного занятия")
        if not attendance.auto_marked_cancelled:
            if attendance.absent_marked_by_user_id is None:
                raise HTTPException(status_code=400, detail="Отработку можно назначить только если пропуск выставил преподаватель")
            absent_marked_by = db.get(User, attendance.absent_marked_by_user_id)
            if not absent_marked_by or not _is_teacher(absent_marked_by):
                raise HTTPException(status_code=400, detail="Отработку можно назначить только если пропуск выставил преподаватель")

    db.commit()
    db.refresh(attendance)
    return attendance


@router.get("/makeups", response_model=list[MakeupItemRead])
def list_makeups(
    include_completed: bool = Query(default=False),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[MakeupItemRead]:
    if not _is_manager_or_admin(current_user):
        raise HTTPException(status_code=403, detail="Доступно только менеджеру или администратору")

    query = (
        db.query(Attendance, Lesson, StudyGroup, User, Client)
        .join(Lesson, Lesson.id == Attendance.lesson_id)
        .join(StudyGroup, StudyGroup.id == Lesson.group_id)
        .join(Client, Client.id == Attendance.client_id)
        .join(User, User.id == Attendance.absent_marked_by_user_id, isouter=True)
        .filter(
            Attendance.status == "absent",
            Lesson.archived_at.is_(None),
            StudyGroup.archived_at.is_(None),
            Client.archived_at.is_(None),
        )
    )
    if not include_completed:
        query = query.filter(Attendance.makeup_completed.is_(False))

    rows = query.order_by(Lesson.start_at.desc()).all()
    result: list[MakeupItemRead] = []
    for attendance, lesson, group, absent_marked_by_user, client in rows:
        teacher_marked_absence = bool(absent_marked_by_user and _is_teacher(absent_marked_by_user))
        if not teacher_marked_absence and not attendance.auto_marked_cancelled:
            continue
        result.append(
            MakeupItemRead(
                attendance_id=attendance.id,
                client_id=client.id,
                client_full_name=f"{client.second_name} {client.first_name}",
                lesson_id=lesson.id,
                lesson_topic=lesson.topic,
                lesson_start_at=lesson.start_at,
                group_id=group.id,
                group_name=group.name,
                absent_marked_by_user_id=attendance.absent_marked_by_user_id,
                makeup_lesson_at=attendance.makeup_lesson_at,
                makeup_teacher_id=attendance.makeup_teacher_id,
                makeup_comment=attendance.makeup_comment,
                makeup_completed=attendance.makeup_completed,
            )
        )
    return result


@router.patch("/makeups/{attendance_id}", response_model=MakeupItemRead)
def assign_makeup(
    attendance_id: int,
    payload: MakeupAssignIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> MakeupItemRead:
    if not _is_manager_or_admin(current_user):
        raise HTTPException(status_code=403, detail="Доступно только менеджеру или администратору")

    attendance = db.get(Attendance, attendance_id)
    if not attendance:
        raise HTTPException(status_code=404, detail="Посещаемость не найдена")
    if attendance.status != "absent":
        raise HTTPException(status_code=400, detail="Отработку можно назначить только для пропуска")
    if not attendance.auto_marked_cancelled:
        if attendance.absent_marked_by_user_id is None:
            raise HTTPException(status_code=400, detail="Отработку можно назначить только если пропуск выставил преподаватель")
        absent_marked_by = db.get(User, attendance.absent_marked_by_user_id)
        if not absent_marked_by or not _is_teacher(absent_marked_by):
            raise HTTPException(status_code=400, detail="Отработку можно назначить только если пропуск выставил преподаватель")

    teacher = db.get(User, payload.makeup_teacher_id)
    if not teacher or not _is_teacher(teacher):
        raise HTTPException(status_code=400, detail="Для отработки нужно выбрать преподавателя")

    attendance.makeup_lesson_at = _to_utc_naive(payload.makeup_lesson_at)
    attendance.makeup_teacher_id = payload.makeup_teacher_id
    attendance.makeup_comment = payload.makeup_comment
    attendance.makeup_completed = payload.makeup_completed
    db.commit()
    db.refresh(attendance)

    lesson = db.get(Lesson, attendance.lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Занятие не найдено")
    group = db.get(StudyGroup, lesson.group_id)
    client = db.get(Client, attendance.client_id)
    if not group or not client:
        raise HTTPException(status_code=404, detail="Связанные данные не найдены")

    return MakeupItemRead(
        attendance_id=attendance.id,
        client_id=client.id,
        client_full_name=f"{client.second_name} {client.first_name}",
        lesson_id=lesson.id,
        lesson_topic=lesson.topic,
        lesson_start_at=lesson.start_at,
        group_id=group.id,
        group_name=group.name,
        absent_marked_by_user_id=attendance.absent_marked_by_user_id,
        makeup_lesson_at=attendance.makeup_lesson_at,
        makeup_teacher_id=attendance.makeup_teacher_id,
        makeup_comment=attendance.makeup_comment,
        makeup_completed=attendance.makeup_completed,
    )


@router.get("/makeups-events", response_model=list[MakeupCalendarEventRead])
def list_makeup_calendar_events(
    teacher_id: int | None = Query(default=None),
    include_completed: bool = Query(default=True),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[MakeupCalendarEventRead]:
    effective_teacher_id = teacher_id
    if _is_teacher(current_user):
        effective_teacher_id = current_user.id

    query = (
        db.query(Attendance, Lesson, StudyGroup, Client)
        .join(Lesson, Lesson.id == Attendance.lesson_id)
        .join(StudyGroup, StudyGroup.id == Lesson.group_id)
        .join(Client, Client.id == Attendance.client_id)
        .filter(
            Attendance.status == "absent",
            Attendance.makeup_lesson_at.is_not(None),
            Attendance.makeup_teacher_id.is_not(None),
            Lesson.archived_at.is_(None),
            StudyGroup.archived_at.is_(None),
            Client.archived_at.is_(None),
        )
    )

    if effective_teacher_id is not None:
        query = query.filter(Attendance.makeup_teacher_id == effective_teacher_id)
    if not include_completed:
        query = query.filter(Attendance.makeup_completed.is_(False))

    rows = query.order_by(Attendance.makeup_lesson_at.asc()).all()
    result: list[MakeupCalendarEventRead] = []
    for attendance, lesson, group, client in rows:
        result.append(
            MakeupCalendarEventRead(
                attendance_id=attendance.id,
                client_id=client.id,
                client_full_name=f"{client.second_name} {client.first_name}",
                group_name=group.name,
                lesson_topic=lesson.topic,
                makeup_lesson_at=attendance.makeup_lesson_at,
                makeup_completed=attendance.makeup_completed,
            )
        )
    return result
