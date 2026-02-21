from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Task
from app.schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter()


@router.get("", response_model=list[TaskRead])
def list_tasks(db: Session = Depends(get_db)) -> list[Task]:
    return db.query(Task).filter(Task.archived_at.is_(None)).order_by(Task.created_at.desc()).all()


@router.post("", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)) -> Task:
    task = Task(**payload.model_dump())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.patch("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)) -> Task:
    task = db.get(Task, task_id)
    if not task or task.archived_at is not None:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)) -> None:
    task = db.get(Task, task_id)
    if not task or task.archived_at is not None:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    task.archived_at = datetime.utcnow()
    db.commit()


@router.post("/{task_id}/restore", response_model=TaskRead)
def restore_task(task_id: int, db: Session = Depends(get_db)) -> Task:
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    task.archived_at = None
    db.commit()
    db.refresh(task)
    return task
