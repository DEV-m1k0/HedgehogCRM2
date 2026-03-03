from __future__ import annotations

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ORMBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class MessageOut(BaseModel):
    message: str


class ArchiveItemRead(BaseModel):
    entity: str
    entity_id: int
    title: str
    subtitle: str | None = None
    archived_at: datetime


class RoleRead(ORMBase):
    id: int
    name: str


class UserRead(ORMBase):
    id: int
    email: str
    first_name: str
    second_name: str
    patronymic: str | None
    income_per_hour: float
    phone: str | None
    avatar_url: str | None = None
    vk_contact: str | None = None
    telegram_contact: str | None = None
    whatsapp_contact: str | None = None
    max_contact: str | None = None
    is_accepted: bool
    created_at: datetime
    role: RoleRead


class UserSelfUpdate(BaseModel):
    email: str | None = Field(default=None, max_length=255)
    first_name: str | None = Field(default=None, min_length=1, max_length=100)
    second_name: str | None = Field(default=None, min_length=1, max_length=100)
    patronymic: str | None = Field(default=None, max_length=100)
    phone: str | None = Field(default=None, max_length=30)
    vk_contact: str | None = Field(default=None, max_length=255)
    telegram_contact: str | None = Field(default=None, max_length=255)
    whatsapp_contact: str | None = Field(default=None, max_length=255)
    max_contact: str | None = Field(default=None, max_length=255)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str | None) -> str | None:
        if value is None:
            return value
        normalized = value.strip().lower()
        if not normalized:
            return None
        if "@" not in normalized or "." not in normalized.split("@")[-1]:
            raise ValueError("Некорректный email")
        return normalized


class RegisterIn(BaseModel):
    email: str
    password: str = Field(min_length=8, max_length=255)
    first_name: str = Field(min_length=1, max_length=100)
    second_name: str = Field(min_length=1, max_length=100)
    patronymic: str | None = None

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        normalized = value.strip().lower()
        if "@" not in normalized or "." not in normalized.split("@")[-1]:
            raise ValueError("Некорректный email")
        return normalized

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if not any(ch.isalpha() for ch in value) or not any(ch.isdigit() for ch in value):
            raise ValueError("Пароль должен содержать буквы и цифры")
        return value


class LoginIn(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class LoginOut(BaseModel):
    user: UserRead
    access_token: str
    token_type: str = "bearer"


class AccessTokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AdminUserActivityRead(BaseModel):
    user_id: int
    full_name: str
    email: str
    role: str
    active_sessions: int
    total_actions: int
    last_activity_at: datetime | None


class UserSessionRead(BaseModel):
    id: int
    session_id: str
    user_id: int
    ip_address: str | None
    user_agent: str | None
    started_at: datetime
    last_seen_at: datetime
    ended_at: datetime | None
    expires_at: datetime | None = None
    revoked_at: datetime | None = None
    is_active: bool


class AuditLogRead(BaseModel):
    id: int
    user_id: int | None
    session_id: str | None
    action: str
    method: str | None
    path: str | None
    status_code: int | None
    ip_address: str | None
    user_agent: str | None
    details: str | None
    is_reviewed: bool
    review_note: str | None
    created_at: datetime


class AuditLogReviewUpdate(BaseModel):
    is_reviewed: bool
    review_note: str | None = None


class ClientCreate(BaseModel):
    first_name: str
    second_name: str
    patronymic: str | None = None
    date_of_birth: date | None = None
    parent_full_name: str | None = None
    parent_phone: str | None = None
    parent_email: str | None = None
    tags: str | None = None


class ClientUpdate(BaseModel):
    first_name: str | None = None
    second_name: str | None = None
    patronymic: str | None = None
    date_of_birth: date | None = None
    parent_full_name: str | None = None
    parent_phone: str | None = None
    parent_email: str | None = None
    tags: str | None = None


class ClientRead(ORMBase):
    id: int
    first_name: str
    second_name: str
    patronymic: str | None
    date_of_birth: date | None
    parent_full_name: str | None
    parent_phone: str | None
    parent_email: str | None
    tags: str | None
    created_at: datetime


class TeacherGroupStudentsRead(BaseModel):
    group_id: int
    group_name: str
    course_name: str | None = None
    students: list[ClientRead]


class CourseCreate(BaseModel):
    name: str
    cost: float = 0.0
    lesson_cost: float = 0.0
    lesson_count: int = 0
    module_count: int = 2


class CourseRead(ORMBase):
    id: int
    name: str
    cost: float
    lesson_cost: float
    lesson_count: int
    module_count: int


class GroupCreate(BaseModel):
    name: str
    course_id: int
    teacher_id: int | None = None
    schedule_text: str | None = None
    audience: str | None = None


class GroupAddStudent(BaseModel):
    client_id: int


class GroupRead(ORMBase):
    id: int
    name: str
    course_id: int
    teacher_id: int | None
    schedule_text: str | None
    audience: str | None


class LessonCreate(BaseModel):
    group_id: int
    topic: str
    lesson_type: str = Field(default="group", pattern="^(individual|group|makeup)$")
    start_at: datetime
    end_at: datetime
    materials_url: str | None = None
    comment: str | None = None
    is_cancelled: bool = False
    is_recurring_weekly: bool = False
    recurrence_until: date | None = None
    reminder_minutes_before: int | None = Field(default=None, ge=0, le=10080)


class LessonUpdate(BaseModel):
    group_id: int | None = None
    topic: str | None = None
    lesson_type: str | None = Field(default=None, pattern="^(individual|group|makeup)$")
    start_at: datetime | None = None
    end_at: datetime | None = None
    materials_url: str | None = None
    comment: str | None = None
    is_cancelled: bool | None = None
    is_recurring_weekly: bool | None = None
    reminder_minutes_before: int | None = Field(default=None, ge=0, le=10080)
    apply_to_future: bool = False


class LessonRead(ORMBase):
    id: int
    group_id: int
    topic: str
    lesson_type: str
    start_at: datetime
    end_at: datetime
    materials_url: str | None
    comment: str | None
    is_conducted: bool
    is_cancelled: bool
    is_recurring_weekly: bool
    recurrence_group_id: str | None
    reminder_minutes_before: int | None


class AttendanceUpsert(BaseModel):
    client_id: int
    status: str = Field(pattern="^(present|absent|late)$")
    comment: str | None = None
    hedgehogs: int = Field(default=0, ge=0, le=1000)
    makeup_lesson_at: datetime | None = None
    makeup_teacher_id: int | None = None
    makeup_comment: str | None = None
    makeup_completed: bool = False


class AttendanceRead(ORMBase):
    id: int
    lesson_id: int
    client_id: int
    status: str
    auto_marked_cancelled: bool
    comment: str | None
    hedgehogs: int
    absent_marked_by_user_id: int | None
    makeup_lesson_at: datetime | None
    makeup_teacher_id: int | None
    makeup_comment: str | None
    makeup_completed: bool


class StudentAttendanceStatsRead(BaseModel):
    client_id: int
    total_lessons: int
    present_count: int
    late_count: int
    absent_count: int
    attendance_rate: float
    total_hedgehogs: int
    average_hedgehogs: float
    makeups_scheduled: int
    makeups_completed: int


class StudentMakeupRead(BaseModel):
    attendance_id: int
    lesson_id: int
    lesson_topic: str
    lesson_start_at: datetime
    status: str
    makeup_lesson_at: datetime | None
    makeup_teacher_id: int | None
    makeup_comment: str | None
    makeup_completed: bool


class MakeupItemRead(BaseModel):
    attendance_id: int
    client_id: int
    client_full_name: str
    lesson_id: int
    lesson_topic: str
    lesson_start_at: datetime
    group_id: int
    group_name: str
    absent_marked_by_user_id: int | None
    makeup_lesson_at: datetime | None
    makeup_teacher_id: int | None
    makeup_group_id: int | None = None
    makeup_comment: str | None
    makeup_completed: bool


class MakeupAssignIn(BaseModel):
    makeup_lesson_at: datetime
    makeup_teacher_id: int
    makeup_comment: str | None = None
    makeup_completed: bool = False


class MakeupCompletionUpdateIn(BaseModel):
    makeup_completed: bool
    makeup_comment: str | None = None


class MakeupCalendarEventRead(BaseModel):
    attendance_id: int
    client_id: int
    client_full_name: str
    group_name: str
    lesson_topic: str
    makeup_lesson_at: datetime
    makeup_completed: bool
    makeup_group_id: int | None = None
    makeup_teacher_id: int | None = None
    participants_count: int = 1


class DealCreate(BaseModel):
    client_id: int
    manager_id: int | None = None
    stage: str = "Первичный контакт"
    amount: float = 0.0
    deadline: datetime | None = None
    status: str = "active"


class DealUpdate(BaseModel):
    stage: str | None = None
    amount: float | None = None
    deadline: datetime | None = None
    status: str | None = None


class DealRead(ORMBase):
    id: int
    client_id: int
    manager_id: int | None
    stage: str
    amount: float
    deadline: datetime | None
    status: str
    created_at: datetime
    updated_at: datetime


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    assignee_id: int | None = None
    creator_id: int | None = None
    client_id: int | None = None
    deal_id: int | None = None
    priority: str = Field(default="medium", pattern="^(low|medium|high)$")
    deadline: datetime | None = None


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    assignee_id: int | None = None
    priority: str | None = Field(default=None, pattern="^(low|medium|high)$")
    deadline: datetime | None = None
    status: str | None = Field(default=None, pattern="^(open|in_progress|done)$")


class TaskRead(ORMBase):
    id: int
    title: str
    description: str | None
    assignee_id: int | None
    creator_id: int | None
    client_id: int | None
    deal_id: int | None
    priority: str
    deadline: datetime | None
    status: str
    created_at: datetime
