from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.api.deps import get_admin_user
from app.db import get_db
from app.models import AuditLog, User, UserSession
from app.schemas import AdminUserActivityRead, AuditLogRead, AuditLogReviewUpdate, UserSessionRead

router = APIRouter(prefix="/admin/activity")


@router.get("/users", response_model=list[AdminUserActivityRead])
def list_user_activity(
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
) -> list[AdminUserActivityRead]:
    users = db.query(User).order_by(User.second_name, User.first_name).all()
    result: list[AdminUserActivityRead] = []
    for user in users:
        active_sessions = (
            db.query(func.count(UserSession.id))
            .filter(UserSession.user_id == user.id, UserSession.is_active.is_(True))
            .scalar()
            or 0
        )
        total_actions = db.query(func.count(AuditLog.id)).filter(AuditLog.user_id == user.id).scalar() or 0
        last_activity = (
            db.query(func.max(AuditLog.created_at))
            .filter(AuditLog.user_id == user.id)
            .scalar()
        )
        result.append(
            AdminUserActivityRead(
                user_id=user.id,
                full_name=f"{user.second_name} {user.first_name}",
                email=user.email,
                role=user.role.name if user.role else "",
                active_sessions=active_sessions,
                total_actions=total_actions,
                last_activity_at=last_activity,
            )
        )
    return result


@router.get("/sessions", response_model=list[UserSessionRead])
def list_sessions(
    user_id: int | None = Query(default=None),
    active_only: bool = Query(default=False),
    limit: int = Query(default=200, ge=1, le=1000),
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
) -> list[UserSession]:
    query = db.query(UserSession)
    if user_id is not None:
        query = query.filter(UserSession.user_id == user_id)
    if active_only:
        query = query.filter(UserSession.is_active.is_(True))
    return query.order_by(UserSession.started_at.desc()).limit(limit).all()


@router.post("/sessions/{session_id}/terminate", status_code=status.HTTP_200_OK)
def terminate_session(
    session_id: str,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
) -> dict[str, str]:
    session = db.query(UserSession).filter(UserSession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Сессия не найдена")
    if not session.is_active:
        return {"message": "Сессия уже завершена"}

    session.is_active = False
    session.ended_at = datetime.now(timezone.utc).replace(tzinfo=None)
    session.revoked_at = datetime.now(timezone.utc).replace(tzinfo=None)
    db.add(
        AuditLog(
            user_id=admin.id,
            session_id=session_id,
            action="session_terminated",
            method="POST",
            path=f"/admin/activity/sessions/{session_id}/terminate",
            status_code=200,
            details=f"terminated_user_id={session.user_id}",
        )
    )
    db.commit()
    return {"message": "Сессия завершена"}


@router.get("/logs", response_model=list[AuditLogRead])
def list_logs(
    user_id: int | None = Query(default=None),
    action: str | None = Query(default=None),
    path: str | None = Query(default=None),
    is_reviewed: bool | None = Query(default=None),
    date_from: datetime | None = Query(default=None),
    date_to: datetime | None = Query(default=None),
    limit: int = Query(default=300, ge=1, le=1500),
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
) -> list[AuditLog]:
    query = db.query(AuditLog)
    if user_id is not None:
        query = query.filter(AuditLog.user_id == user_id)
    if action:
        query = query.filter(AuditLog.action.ilike(f"%{action.strip()}%"))
    if path:
        query = query.filter(AuditLog.path.ilike(f"%{path.strip()}%"))
    if is_reviewed is not None:
        query = query.filter(AuditLog.is_reviewed == is_reviewed)
    if date_from is not None:
        query = query.filter(AuditLog.created_at >= date_from)
    if date_to is not None:
        query = query.filter(AuditLog.created_at <= date_to)
    return query.order_by(AuditLog.created_at.desc()).limit(limit).all()


@router.patch("/logs/{log_id}", response_model=AuditLogRead)
def review_log(
    log_id: int,
    payload: AuditLogReviewUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
) -> AuditLog:
    log_item = db.get(AuditLog, log_id)
    if not log_item:
        raise HTTPException(status_code=404, detail="Лог не найден")
    log_item.is_reviewed = payload.is_reviewed
    log_item.review_note = payload.review_note
    db.commit()
    db.refresh(log_item)
    return log_item
