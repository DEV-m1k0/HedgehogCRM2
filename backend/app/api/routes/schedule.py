from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Attendance, Lesson
from app.schemas import AttendanceRead, AttendanceUpsert, LessonCreate, LessonRead

router = APIRouter()


@router.get("/lessons", response_model=list[LessonRead])
def list_lessons(db: Session = Depends(get_db)) -> list[Lesson]:
    return db.query(Lesson).order_by(Lesson.start_at.desc()).all()


@router.post("/lessons", response_model=LessonRead, status_code=status.HTTP_201_CREATED)
def create_lesson(payload: LessonCreate, db: Session = Depends(get_db)) -> Lesson:
    lesson = Lesson(**payload.model_dump())
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson


@router.get("/lessons/{lesson_id}/attendance", response_model=list[AttendanceRead])
def list_lesson_attendance(lesson_id: int, db: Session = Depends(get_db)) -> list[Attendance]:
    return db.query(Attendance).filter(Attendance.lesson_id == lesson_id).order_by(Attendance.id).all()


@router.put("/lessons/{lesson_id}/attendance", response_model=AttendanceRead)
def upsert_attendance(lesson_id: int, payload: AttendanceUpsert, db: Session = Depends(get_db)) -> Attendance:
    lesson = db.get(Lesson, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Занятие не найдено")

    attendance = (
        db.query(Attendance)
        .filter(Attendance.lesson_id == lesson_id, Attendance.client_id == payload.client_id)
        .first()
    )

    if attendance:
        attendance.status = payload.status
        attendance.comment = payload.comment
    else:
        attendance = Attendance(lesson_id=lesson_id, **payload.model_dump())
        db.add(attendance)

    db.commit()
    db.refresh(attendance)
    return attendance
