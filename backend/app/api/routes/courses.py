from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Course
from app.schemas import CourseCreate, CourseRead

router = APIRouter()


@router.get("", response_model=list[CourseRead])
def list_courses(db: Session = Depends(get_db)) -> list[Course]:
    return db.query(Course).filter(Course.archived_at.is_(None)).order_by(Course.id.desc()).all()


@router.post("", response_model=CourseRead, status_code=status.HTTP_201_CREATED)
def create_course(payload: CourseCreate, db: Session = Depends(get_db)) -> Course:
    exists = db.query(Course).filter(Course.name == payload.name, Course.archived_at.is_(None)).first()
    if exists:
        raise HTTPException(status_code=409, detail="Курс с таким названием уже существует")
    course = Course(**payload.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db)) -> None:
    course = db.get(Course, course_id)
    if not course or course.archived_at is not None:
        raise HTTPException(status_code=404, detail="Курс не найден")
    course.archived_at = datetime.utcnow()
    db.commit()
