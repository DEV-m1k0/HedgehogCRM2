import logging
import os
import time
import uuid
from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from app.api.router import api_router
from app.db import SessionLocal, engine
from app.logging_setup import setup_logging
from app.models import AuditLog, Base, Role, UserSession
from app.security import decode_token
from app.services.lesson_reminders import start_lesson_reminder_worker, stop_lesson_reminder_worker

DEFAULT_ROLES = ["администратор", "менеджер", "преподаватель", "аноним"]
BACKEND_ROOT = Path(__file__).resolve().parents[1]
MEDIA_ROOT = BACKEND_ROOT / "media"


def _seed_roles() -> None:
    db: Session = SessionLocal()
    try:
        for role_name in DEFAULT_ROLES:
            exists = db.query(Role).filter(Role.name == role_name).first()
            if not exists:
                db.add(Role(name=role_name))
        db.commit()
    finally:
        db.close()


def _ensure_schedule_schema() -> None:
    inspector = inspect(engine)
    if "lessons" not in inspector.get_table_names():
        return

    lesson_columns = {column["name"] for column in inspector.get_columns("lessons")}
    with engine.begin() as connection:
        if "is_recurring_weekly" not in lesson_columns:
            connection.execute(text("ALTER TABLE lessons ADD COLUMN is_recurring_weekly BOOLEAN DEFAULT 0"))
        if "recurrence_group_id" not in lesson_columns:
            connection.execute(text("ALTER TABLE lessons ADD COLUMN recurrence_group_id VARCHAR(64)"))
        if "is_cancelled" not in lesson_columns:
            connection.execute(text("ALTER TABLE lessons ADD COLUMN is_cancelled BOOLEAN NOT NULL DEFAULT 0"))
        if "lesson_type" not in lesson_columns:
            connection.execute(text("ALTER TABLE lessons ADD COLUMN lesson_type VARCHAR(20) NOT NULL DEFAULT 'group'"))
        if "reminder_minutes_before" not in lesson_columns:
            connection.execute(text("ALTER TABLE lessons ADD COLUMN reminder_minutes_before INTEGER"))
        if "reminder_sent_at" not in lesson_columns:
            connection.execute(text("ALTER TABLE lessons ADD COLUMN reminder_sent_at DATETIME"))


def _ensure_archive_schema() -> None:
    inspector = inspect(engine)
    table_names = set(inspector.get_table_names())
    tables_with_archive = {"clients", "courses", "groups", "lessons", "deals", "tasks"}

    with engine.begin() as connection:
        for table in tables_with_archive:
            if table not in table_names:
                continue
            columns = {column["name"] for column in inspector.get_columns(table)}
            if "archived_at" not in columns:
                connection.execute(text(f"ALTER TABLE {table} ADD COLUMN archived_at DATETIME"))


def _ensure_auth_schema() -> None:
    inspector = inspect(engine)
    if "user_sessions" not in inspector.get_table_names():
        return
    session_columns = {column["name"] for column in inspector.get_columns("user_sessions")}
    with engine.begin() as connection:
        if "refresh_token_hash" not in session_columns:
            connection.execute(text("ALTER TABLE user_sessions ADD COLUMN refresh_token_hash VARCHAR(255)"))
        if "expires_at" not in session_columns:
            connection.execute(text("ALTER TABLE user_sessions ADD COLUMN expires_at DATETIME"))
        if "revoked_at" not in session_columns:
            connection.execute(text("ALTER TABLE user_sessions ADD COLUMN revoked_at DATETIME"))


def _ensure_users_contacts_schema() -> None:
    inspector = inspect(engine)
    if "users" not in inspector.get_table_names():
        return
    user_columns = {column["name"] for column in inspector.get_columns("users")}
    with engine.begin() as connection:
        if "vk_contact" not in user_columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN vk_contact VARCHAR(255)"))
        if "telegram_contact" not in user_columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN telegram_contact VARCHAR(255)"))
        if "whatsapp_contact" not in user_columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN whatsapp_contact VARCHAR(255)"))
        if "max_contact" not in user_columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN max_contact VARCHAR(255)"))
        if "avatar_url" not in user_columns:
            connection.execute(text("ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500)"))


def _ensure_attendance_schema() -> None:
    inspector = inspect(engine)
    if "attendance" not in inspector.get_table_names():
        return
    attendance_columns = {column["name"] for column in inspector.get_columns("attendance")}
    with engine.begin() as connection:
        if "hedgehogs" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN hedgehogs INTEGER NOT NULL DEFAULT 0"))
        if "auto_marked_cancelled" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN auto_marked_cancelled BOOLEAN NOT NULL DEFAULT 0"))
        if "absent_marked_by_user_id" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN absent_marked_by_user_id INTEGER"))
        if "makeup_lesson_at" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN makeup_lesson_at DATETIME"))
        if "makeup_teacher_id" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN makeup_teacher_id INTEGER"))
        if "makeup_group_id" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN makeup_group_id INTEGER"))
        if "makeup_comment" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN makeup_comment VARCHAR(255)"))
        if "makeup_completed" not in attendance_columns:
            connection.execute(text("ALTER TABLE attendance ADD COLUMN makeup_completed BOOLEAN NOT NULL DEFAULT 0"))
        # Backfill old absent rows: if marker is missing, infer from lesson group teacher.
        connection.execute(
            text(
                """
                UPDATE attendance
                SET absent_marked_by_user_id = (
                    SELECT g.teacher_id
                    FROM lessons l
                    JOIN groups g ON g.id = l.group_id
                    WHERE l.id = attendance.lesson_id
                )
                WHERE status = 'absent'
                  AND absent_marked_by_user_id IS NULL
                  AND (
                    SELECT g.teacher_id
                    FROM lessons l
                    JOIN groups g ON g.id = l.group_id
                    WHERE l.id = attendance.lesson_id
                  ) IS NOT NULL
                """
            )
        )


def _ensure_makeup_groups_schema() -> None:
    inspector = inspect(engine)
    if "groups" not in inspector.get_table_names():
        return
    group_columns = {column["name"] for column in inspector.get_columns("groups")}
    with engine.begin() as connection:
        if "is_temporary_makeup" not in group_columns:
            connection.execute(text("ALTER TABLE groups ADD COLUMN is_temporary_makeup BOOLEAN NOT NULL DEFAULT 0"))
        if "makeup_session_at" not in group_columns:
            connection.execute(text("ALTER TABLE groups ADD COLUMN makeup_session_at DATETIME"))


def create_app() -> FastAPI:
    setup_logging()
    logger = logging.getLogger("hedgehog.api")
    app = FastAPI(title="Hedgehog CRM API")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[origin.strip() for origin in os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000").split(",") if origin.strip()],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    MEDIA_ROOT.mkdir(parents=True, exist_ok=True)
    app.mount("/media", StaticFiles(directory=str(MEDIA_ROOT)), name="media")

    @app.on_event("startup")
    def on_startup() -> None:
        Base.metadata.create_all(bind=engine)
        _ensure_schedule_schema()
        _ensure_archive_schema()
        _ensure_auth_schema()
        _ensure_users_contacts_schema()
        _ensure_attendance_schema()
        _ensure_makeup_groups_schema()
        _seed_roles()
        start_lesson_reminder_worker(SessionLocal)
        logger.info("Application startup completed")

    @app.on_event("shutdown")
    def on_shutdown() -> None:
        stop_lesson_reminder_worker()

    @app.middleware("http")
    async def request_logger(request: Request, call_next):
        request_id = str(uuid.uuid4())
        start = time.perf_counter()
        path = request.url.path
        method = request.method
        authorization = request.headers.get("Authorization")
        session_id: str | None = None
        user_id: int | None = None
        ip_address = request.headers.get("X-Forwarded-For", "").split(",")[0].strip() or (request.client.host if request.client else None)
        user_agent = request.headers.get("user-agent")
        logger.info("request_start id=%s method=%s path=%s", request_id, request.method, request.url.path)
        public_paths = {
            "/auth/login",
            "/auth/register",
            "/auth/refresh",
            "/health",
            "/openapi.json",
            "/docs",
            "/docs/oauth2-redirect",
            "/redoc",
        }
        is_public_path = path in public_paths or path.startswith("/media/")
        has_valid_session = False

        db = SessionLocal()
        try:
            if authorization and authorization.lower().startswith("bearer "):
                try:
                    payload = decode_token(authorization.split(" ", 1)[1].strip(), expected_type="access")
                    session_id = payload.get("sid")
                    user_raw = payload.get("sub")
                    user_id = int(user_raw) if user_raw else None
                except Exception:
                    session_id = None
                    user_id = None

            if session_id:
                session = db.query(UserSession).filter(UserSession.session_id == session_id).first()
                if session:
                    if (not session.is_active or session.revoked_at is not None) and path not in {"/auth/login", "/auth/register", "/auth/refresh"}:
                        db.close()
                        return JSONResponse(status_code=401, content={"detail": "Сессия завершена администратором"})
                    session.last_seen_at = datetime.utcnow()
                    has_valid_session = bool(session.is_active and session.revoked_at is None)
                    db.commit()
        except Exception:
            db.rollback()
            logger.exception("request_session_update_failed id=%s", request_id)
        finally:
            db.close()

        if request.method != "OPTIONS" and not is_public_path and not has_valid_session:
            return JSONResponse(status_code=401, content={"detail": "Требуется авторизация"})

        try:
            response = await call_next(request)
            duration_ms = int((time.perf_counter() - start) * 1000)
            logger.info(
                "request_end id=%s status=%s duration_ms=%s path=%s",
                request_id,
                response.status_code,
                duration_ms,
                request.url.path,
            )
            db = SessionLocal()
            try:
                db.add(
                    AuditLog(
                        user_id=user_id,
                        session_id=session_id,
                        action="http_request",
                        method=method,
                        path=path,
                        status_code=response.status_code,
                        ip_address=ip_address,
                        user_agent=user_agent,
                        details=f"duration_ms={duration_ms}",
                    )
                )
                db.commit()
            except Exception:
                db.rollback()
                logger.exception("request_audit_log_failed id=%s", request_id)
            finally:
                db.close()
            response.headers["X-Request-Id"] = request_id
            return response
        except Exception:
            duration_ms = int((time.perf_counter() - start) * 1000)
            logger.exception("request_error id=%s duration_ms=%s path=%s", request_id, duration_ms, request.url.path)
            db = SessionLocal()
            try:
                db.add(
                    AuditLog(
                        user_id=user_id,
                        session_id=session_id,
                        action="http_error",
                        method=method,
                        path=path,
                        status_code=500,
                        ip_address=ip_address,
                        user_agent=user_agent,
                        details=f"duration_ms={duration_ms}",
                    )
                )
                db.commit()
            except Exception:
                db.rollback()
                logger.exception("request_error_audit_log_failed id=%s", request_id)
            finally:
                db.close()
            return JSONResponse(
                status_code=500,
                content={"detail": "Внутренняя ошибка сервера", "request_id": request_id},
            )

    app.include_router(api_router)
    return app


app = create_app()
