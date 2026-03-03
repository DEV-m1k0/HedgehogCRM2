from __future__ import annotations

from datetime import datetime

import bcrypt
from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    users: Mapped[list[User]] = relationship(back_populates="role")


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    second_name: Mapped[str] = mapped_column(String(100), nullable=False)
    patronymic: Mapped[str | None] = mapped_column(String(100), nullable=True)
    income_per_hour: Mapped[float] = mapped_column(Float, default=0.0)
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(30), nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    vk_contact: Mapped[str | None] = mapped_column(String(255), nullable=True)
    telegram_contact: Mapped[str | None] = mapped_column(String(255), nullable=True)
    whatsapp_contact: Mapped[str | None] = mapped_column(String(255), nullable=True)
    max_contact: Mapped[str | None] = mapped_column(String(255), nullable=True)
    is_accepted: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    role: Mapped[Role] = relationship(back_populates="users")
    assigned_tasks: Mapped[list[Task]] = relationship(
        foreign_keys="Task.assignee_id",
        back_populates="assignee",
    )
    created_tasks: Mapped[list[Task]] = relationship(
        foreign_keys="Task.creator_id",
        back_populates="creator",
    )
    groups_as_teacher: Mapped[list[StudyGroup]] = relationship(back_populates="teacher")
    sessions: Mapped[list[UserSession]] = relationship(back_populates="user")
    audit_logs: Mapped[list[AuditLog]] = relationship(back_populates="user")

    def set_password(self, password: str) -> None:
        self.password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    def check_password(self, password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), self.password.encode("utf-8"))


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    second_name: Mapped[str] = mapped_column(String(100), nullable=False)
    patronymic: Mapped[str | None] = mapped_column(String(100), nullable=True)
    date_of_birth: Mapped[datetime | None] = mapped_column(Date, nullable=True)
    parent_full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    parent_phone: Mapped[str | None] = mapped_column(String(30), nullable=True)
    parent_email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    tags: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    archived_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    deals: Mapped[list[Deal]] = relationship(back_populates="client")
    tasks: Mapped[list[Task]] = relationship(back_populates="client")
    groups: Mapped[list[StudyGroup]] = relationship(secondary="group_students", back_populates="students")
    attendance: Mapped[list[Attendance]] = relationship(back_populates="student")


class Course(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    cost: Mapped[float] = mapped_column(Float, default=0.0)
    lesson_cost: Mapped[float] = mapped_column(Float, default=0.0)
    lesson_count: Mapped[int] = mapped_column(Integer, default=0)
    module_count: Mapped[int] = mapped_column(Integer, default=2)
    archived_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    groups: Mapped[list[StudyGroup]] = relationship(back_populates="course")


class StudyGroup(Base):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(150), unique=True, nullable=False)
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"), nullable=False)
    teacher_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    schedule_text: Mapped[str | None] = mapped_column(String(255), nullable=True)
    audience: Mapped[str | None] = mapped_column(String(100), nullable=True)
    is_temporary_makeup: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    makeup_session_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    archived_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    course: Mapped[Course] = relationship(back_populates="groups")
    teacher: Mapped[User | None] = relationship(back_populates="groups_as_teacher")
    students: Mapped[list[Client]] = relationship(secondary="group_students", back_populates="groups")
    lessons: Mapped[list[Lesson]] = relationship(back_populates="group", cascade="all, delete-orphan")


class GroupStudent(Base):
    __tablename__ = "group_students"
    __table_args__ = (UniqueConstraint("group_id", "client_id", name="uq_group_student"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), nullable=False)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"), nullable=False)


class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), nullable=False)
    topic: Mapped[str] = mapped_column(String(255), nullable=False)
    lesson_type: Mapped[str] = mapped_column(String(20), default="group", nullable=False)
    start_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    materials_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_conducted: Mapped[bool] = mapped_column(Boolean, default=False)
    is_cancelled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_recurring_weekly: Mapped[bool] = mapped_column(Boolean, default=False)
    recurrence_group_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    reminder_minutes_before: Mapped[int | None] = mapped_column(Integer, nullable=True)
    reminder_sent_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    archived_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    group: Mapped[StudyGroup] = relationship(back_populates="lessons")
    attendance: Mapped[list[Attendance]] = relationship(back_populates="lesson", cascade="all, delete-orphan")


class Attendance(Base):
    __tablename__ = "attendance"
    __table_args__ = (UniqueConstraint("lesson_id", "client_id", name="uq_lesson_client"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"), nullable=False)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="present")
    auto_marked_cancelled: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    comment: Mapped[str | None] = mapped_column(String(255), nullable=True)
    hedgehogs: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    absent_marked_by_user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    makeup_lesson_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    makeup_teacher_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    makeup_group_id: Mapped[int | None] = mapped_column(ForeignKey("groups.id"), nullable=True)
    makeup_comment: Mapped[str | None] = mapped_column(String(255), nullable=True)
    makeup_completed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    lesson: Mapped[Lesson] = relationship(back_populates="attendance")
    student: Mapped[Client] = relationship(back_populates="attendance")
    absent_marked_by_user: Mapped[User | None] = relationship(foreign_keys=[absent_marked_by_user_id])
    makeup_teacher: Mapped[User | None] = relationship(foreign_keys=[makeup_teacher_id])
    makeup_group: Mapped[StudyGroup | None] = relationship(foreign_keys=[makeup_group_id])


class Deal(Base):
    __tablename__ = "deals"

    id: Mapped[int] = mapped_column(primary_key=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"), nullable=False)
    manager_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    stage: Mapped[str] = mapped_column(String(50), default="Первичный контакт")
    amount: Mapped[float] = mapped_column(Float, default=0.0)
    deadline: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    archived_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    client: Mapped[Client] = relationship(back_populates="deals")


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    assignee_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    creator_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    client_id: Mapped[int | None] = mapped_column(ForeignKey("clients.id"), nullable=True)
    deal_id: Mapped[int | None] = mapped_column(ForeignKey("deals.id"), nullable=True)
    priority: Mapped[str] = mapped_column(String(20), default="medium")
    deadline: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="open")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    archived_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    assignee: Mapped[User | None] = relationship(foreign_keys=[assignee_id], back_populates="assigned_tasks")
    creator: Mapped[User | None] = relationship(foreign_keys=[creator_id], back_populates="created_tasks")
    client: Mapped[Client | None] = relationship(back_populates="tasks")


class UserSession(Base):
    __tablename__ = "user_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    session_id: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    ip_address: Mapped[str | None] = mapped_column(String(64), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String(500), nullable=True)
    started_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    last_seen_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    ended_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    refresh_token_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    expires_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    user: Mapped[User] = relationship(back_populates="sessions")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)
    session_id: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)
    action: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    method: Mapped[str | None] = mapped_column(String(10), nullable=True)
    path: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status_code: Mapped[int | None] = mapped_column(Integer, nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String(64), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String(500), nullable=True)
    details: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_reviewed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    review_note: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False, index=True)

    user: Mapped[User | None] = relationship(back_populates="audit_logs")
