from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Client, GroupStudent, StudyGroup
from app.schemas import ClientRead, GroupAddStudent, GroupCreate, GroupRead

router = APIRouter()


@router.get("", response_model=list[GroupRead])
def list_groups(db: Session = Depends(get_db)) -> list[StudyGroup]:
    return db.query(StudyGroup).filter(StudyGroup.archived_at.is_(None)).order_by(StudyGroup.id.desc()).all()


@router.post("", response_model=GroupRead, status_code=status.HTTP_201_CREATED)
def create_group(payload: GroupCreate, db: Session = Depends(get_db)) -> StudyGroup:
    group = StudyGroup(**payload.model_dump())
    db.add(group)
    db.commit()
    db.refresh(group)
    return group


@router.get("/{group_id}/students", response_model=list[ClientRead])
def list_group_students(group_id: int, db: Session = Depends(get_db)) -> list[Client]:
    group = db.get(StudyGroup, group_id)
    if not group or group.archived_at is not None:
        raise HTTPException(status_code=404, detail="Группа не найдена")

    return (
        db.query(Client)
        .join(GroupStudent, GroupStudent.client_id == Client.id)
        .filter(GroupStudent.group_id == group_id, Client.archived_at.is_(None))
        .order_by(Client.second_name, Client.first_name)
        .all()
    )


@router.post("/{group_id}/students", status_code=status.HTTP_201_CREATED)
def add_student_to_group(group_id: int, payload: GroupAddStudent, db: Session = Depends(get_db)) -> dict[str, str]:
    group = db.get(StudyGroup, group_id)
    if not group or group.archived_at is not None:
        raise HTTPException(status_code=404, detail="Группа не найдена")

    student = db.get(Client, payload.client_id)
    if not student or student.archived_at is not None:
        raise HTTPException(status_code=404, detail="Клиент не найден")

    exists = (
        db.query(GroupStudent)
        .filter(GroupStudent.group_id == group_id, GroupStudent.client_id == payload.client_id)
        .first()
    )
    if exists:
        raise HTTPException(status_code=409, detail="Ученик уже в группе")

    link = GroupStudent(group_id=group_id, client_id=payload.client_id)
    db.add(link)
    db.commit()

    return {"message": "Ученик добавлен в группу"}


@router.delete("/{group_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_group(group_id: int, db: Session = Depends(get_db)) -> None:
    group = db.get(StudyGroup, group_id)
    if not group or group.archived_at is not None:
        raise HTTPException(status_code=404, detail="Группа не найдена")
    group.archived_at = datetime.utcnow()
    db.commit()
