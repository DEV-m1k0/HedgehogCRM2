from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, HTTPException, Query, status

from app.db import SessionLocal
from app.models import Client, Course, Deal, Lesson, StudyGroup, Task
from app.schemas import ArchiveItemRead

router = APIRouter()

ENTITY_MODELS = {
    "clients": Client,
    "courses": Course,
    "groups": StudyGroup,
    "lessons": Lesson,
    "deals": Deal,
    "tasks": Task,
}


def _as_naive_utc(value: datetime | None) -> datetime | None:
    if value is None:
        return None
    if value.tzinfo is not None:
        return value.astimezone(timezone.utc).replace(tzinfo=None)
    return value


def _build_item(entity: str, item: Any) -> ArchiveItemRead:
    if entity == "clients":
        title = f"{item.second_name} {item.first_name}"
        subtitle = item.parent_full_name
    elif entity == "courses":
        title = item.name
        subtitle = f"Занятий: {item.lesson_count}"
    elif entity == "groups":
        title = item.name
        subtitle = f"course_id={item.course_id}"
    elif entity == "lessons":
        title = item.topic
        subtitle = item.start_at.strftime("%Y-%m-%d %H:%M")
    elif entity == "deals":
        title = f"Сделка #{item.id}"
        subtitle = f"stage={item.stage}, amount={item.amount}"
    elif entity == "tasks":
        title = item.title
        subtitle = item.status
    else:
        title = f"{entity} #{item.id}"
        subtitle = None

    return ArchiveItemRead(
        entity=entity,
        entity_id=item.id,
        title=title,
        subtitle=subtitle,
        archived_at=item.archived_at,
    )


@router.get("/items", response_model=list[ArchiveItemRead])
def list_archive_items(
    entity: str = Query(default="all"),
    q: str | None = Query(default=None),
    archived_from: datetime | None = Query(default=None),
    archived_to: datetime | None = Query(default=None),
    sort_by: str = Query(default="archived_at"),
    sort_dir: str = Query(default="desc"),
) -> list[ArchiveItemRead]:
    entities = [entity] if entity != "all" else list(ENTITY_MODELS.keys())

    for item in entities:
        if item not in ENTITY_MODELS:
            raise HTTPException(status_code=400, detail=f"Неизвестный тип архива: {item}")

    allowed_sort_by = {"archived_at", "title", "entity"}
    if sort_by not in allowed_sort_by:
        raise HTTPException(status_code=400, detail=f"Некорректная сортировка: {sort_by}")

    if sort_dir not in {"asc", "desc"}:
        raise HTTPException(status_code=400, detail=f"Некорректное направление сортировки: {sort_dir}")

    archived_from = _as_naive_utc(archived_from)
    archived_to = _as_naive_utc(archived_to)

    db = SessionLocal()
    try:
        result: list[ArchiveItemRead] = []
        search = q.lower().strip() if q else None

        for item_entity in entities:
            model = ENTITY_MODELS[item_entity]
            rows = db.query(model).filter(model.archived_at.is_not(None)).all()

            for row in rows:
                archive_item = _build_item(item_entity, row)
                if search:
                    haystack = f"{archive_item.title} {archive_item.subtitle or ''}".lower()
                    if search not in haystack:
                        continue
                item_archived_at = _as_naive_utc(archive_item.archived_at)
                if not item_archived_at:
                    continue
                if archived_from and item_archived_at < archived_from:
                    continue
                if archived_to and item_archived_at > archived_to:
                    continue
                result.append(archive_item)

        reverse = sort_dir == "desc"
        if sort_by == "archived_at":
            result.sort(key=lambda item: item.archived_at, reverse=reverse)
        elif sort_by == "title":
            result.sort(key=lambda item: item.title.lower(), reverse=reverse)
        else:
            result.sort(key=lambda item: item.entity, reverse=reverse)
        return result
    finally:
        db.close()


@router.get("/{entity}/{entity_id}")
def get_archived_item(entity: str, entity_id: int) -> dict[str, Any]:
    if entity not in ENTITY_MODELS:
        raise HTTPException(status_code=400, detail="Неизвестный тип архива")

    db = SessionLocal()
    try:
        model = ENTITY_MODELS[entity]
        item = db.get(model, entity_id)
        if not item or item.archived_at is None:
            raise HTTPException(status_code=404, detail="Архивный элемент не найден")

        payload = {column.name: getattr(item, column.name) for column in model.__table__.columns}
        for key, value in payload.items():
            if isinstance(value, datetime):
                payload[key] = value.isoformat()
        return payload
    finally:
        db.close()


@router.post("/{entity}/{entity_id}/restore", status_code=status.HTTP_200_OK)
def restore_archived_item(entity: str, entity_id: int) -> dict[str, str]:
    if entity not in ENTITY_MODELS:
        raise HTTPException(status_code=400, detail="Неизвестный тип архива")

    db = SessionLocal()
    try:
        model = ENTITY_MODELS[entity]
        item = db.get(model, entity_id)
        if not item:
            raise HTTPException(status_code=404, detail="Элемент не найден")

        item.archived_at = None
        db.commit()
        return {"message": "Элемент восстановлен"}
    finally:
        db.close()
