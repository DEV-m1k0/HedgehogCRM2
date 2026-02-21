from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db import get_db
from app.models import Attendance, Client, Course, GroupStudent, Lesson, StudyGroup, User
from app.schemas import (
    ClientCreate,
    ClientRead,
    ClientUpdate,
    StudentAttendanceStatsRead,
    StudentMakeupRead,
    TeacherGroupStudentsRead,
)
from datetime import datetime

router = APIRouter()


def _is_teacher_role(user: User) -> bool:
    role_name = (user.role.name if user.role else "").lower()
    return "преподаватель" in role_name or "teacher" in role_name


def _teacher_has_student(db: Session, teacher_id: int, client_id: int) -> bool:
    return (
        db.query(GroupStudent)
        .join(StudyGroup, StudyGroup.id == GroupStudent.group_id)
        .filter(
            GroupStudent.client_id == client_id,
            StudyGroup.teacher_id == teacher_id,
            StudyGroup.archived_at.is_(None),
        )
        .first()
        is not None
    )


@router.get("", response_model=list[ClientRead])
def list_clients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[Client]:
    if _is_teacher_role(current_user):
        raise HTTPException(status_code=403, detail="Для преподавателя доступна только страница 'Мои ученики'")
    return db.query(Client).filter(Client.archived_at.is_(None)).order_by(Client.created_at.desc()).all()


@router.get("/my-students", response_model=list[ClientRead])
def list_my_students(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[Client]:
    if not _is_teacher_role(current_user):
        raise HTTPException(status_code=403, detail="Эндпоинт доступен только преподавателям")
    return (
        db.query(Client)
        .join(GroupStudent, GroupStudent.client_id == Client.id)
        .join(StudyGroup, StudyGroup.id == GroupStudent.group_id)
        .filter(
            Client.archived_at.is_(None),
            StudyGroup.archived_at.is_(None),
            StudyGroup.teacher_id == current_user.id,
        )
        .distinct()
        .order_by(Client.second_name, Client.first_name)
        .all()
    )


@router.get("/my-students/grouped", response_model=list[TeacherGroupStudentsRead])
def list_my_students_grouped(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[TeacherGroupStudentsRead]:
    if not _is_teacher_role(current_user):
        raise HTTPException(status_code=403, detail="Эндпоинт доступен только преподавателям")

    groups = (
        db.query(StudyGroup)
        .join(Course, Course.id == StudyGroup.course_id, isouter=True)
        .filter(StudyGroup.teacher_id == current_user.id, StudyGroup.archived_at.is_(None))
        .order_by(StudyGroup.name)
        .all()
    )

    result: list[TeacherGroupStudentsRead] = []
    for group in groups:
        students = (
            db.query(Client)
            .join(GroupStudent, GroupStudent.client_id == Client.id)
            .filter(GroupStudent.group_id == group.id, Client.archived_at.is_(None))
            .order_by(Client.second_name, Client.first_name)
            .all()
        )
        result.append(
            TeacherGroupStudentsRead(
                group_id=group.id,
                group_name=group.name,
                course_name=group.course.name if group.course else None,
                students=students,
            )
        )
    return result


@router.get("/{client_id}", response_model=ClientRead)
def get_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Client:
    client = db.get(Client, client_id)
    if not client or client.archived_at is not None:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    if _is_teacher_role(current_user) and not _teacher_has_student(db, current_user.id, client_id):
        raise HTTPException(status_code=403, detail="Нет доступа к этому ученику")
    return client


@router.get("/{client_id}/stats", response_model=StudentAttendanceStatsRead)
def get_client_attendance_stats(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> StudentAttendanceStatsRead:
    client = db.get(Client, client_id)
    if not client or client.archived_at is not None:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    if _is_teacher_role(current_user) and not _teacher_has_student(db, current_user.id, client_id):
        raise HTTPException(status_code=403, detail="Нет доступа к этому ученику")

    rows = (
        db.query(Attendance)
        .join(Lesson, Lesson.id == Attendance.lesson_id)
        .filter(
            Attendance.client_id == client_id,
            Lesson.archived_at.is_(None),
        )
        .all()
    )

    total = len(rows)
    present_count = sum(1 for row in rows if row.status == "present")
    late_count = sum(1 for row in rows if row.status == "late")
    absent_count = sum(1 for row in rows if row.status == "absent")
    total_hedgehogs = sum(max(0, row.hedgehogs or 0) for row in rows)
    makeups_scheduled = sum(1 for row in rows if row.makeup_lesson_at is not None)
    makeups_completed = sum(1 for row in rows if row.makeup_completed)

    attendance_rate = round(((present_count + late_count) / total) * 100, 2) if total > 0 else 0.0
    average_hedgehogs = round(total_hedgehogs / total, 2) if total > 0 else 0.0

    return StudentAttendanceStatsRead(
        client_id=client_id,
        total_lessons=total,
        present_count=present_count,
        late_count=late_count,
        absent_count=absent_count,
        attendance_rate=attendance_rate,
        total_hedgehogs=total_hedgehogs,
        average_hedgehogs=average_hedgehogs,
        makeups_scheduled=makeups_scheduled,
        makeups_completed=makeups_completed,
    )


@router.get("/{client_id}/makeups", response_model=list[StudentMakeupRead])
def get_client_makeups(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[StudentMakeupRead]:
    client = db.get(Client, client_id)
    if not client or client.archived_at is not None:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    if _is_teacher_role(current_user) and not _teacher_has_student(db, current_user.id, client_id):
        raise HTTPException(status_code=403, detail="Нет доступа к этому ученику")

    rows = (
        db.query(Attendance, Lesson)
        .join(Lesson, Lesson.id == Attendance.lesson_id)
        .filter(
            Attendance.client_id == client_id,
            Attendance.status == "absent",
            Lesson.archived_at.is_(None),
        )
        .order_by(Lesson.start_at.desc())
        .all()
    )

    result: list[StudentMakeupRead] = []
    for attendance, lesson in rows:
        result.append(
            StudentMakeupRead(
                attendance_id=attendance.id,
                lesson_id=lesson.id,
                lesson_topic=lesson.topic,
                lesson_start_at=lesson.start_at,
                status=attendance.status,
                makeup_lesson_at=attendance.makeup_lesson_at,
                makeup_teacher_id=attendance.makeup_teacher_id,
                makeup_comment=attendance.makeup_comment,
                makeup_completed=attendance.makeup_completed,
            )
        )
    return result


@router.post("", response_model=ClientRead, status_code=status.HTTP_201_CREATED)
def create_client(
    payload: ClientCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> Client:
    client = Client(**payload.model_dump())
    db.add(client)
    db.commit()
    db.refresh(client)
    return client


@router.patch("/{client_id}", response_model=ClientRead)
def update_client(
    client_id: int,
    payload: ClientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Client:
    client = db.get(Client, client_id)
    if not client or client.archived_at is not None:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    if _is_teacher_role(current_user) and not _teacher_has_student(db, current_user.id, client_id):
        raise HTTPException(status_code=403, detail="Нет доступа к этому ученику")

    values = payload.model_dump(exclude_unset=True)
    for key, value in values.items():
        setattr(client, key, value)

    db.commit()
    db.refresh(client)
    return client


@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    client = db.get(Client, client_id)
    if not client or client.archived_at is not None:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    if _is_teacher_role(current_user) and not _teacher_has_student(db, current_user.id, client_id):
        raise HTTPException(status_code=403, detail="Нет доступа к этому ученику")
    client.archived_at = datetime.utcnow()
    db.commit()


@router.post("/{client_id}/restore", response_model=ClientRead)
def restore_client(
    client_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> Client:
    client = db.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Клиент не найден")
    client.archived_at = None
    db.commit()
    db.refresh(client)
    return client
