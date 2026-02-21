from __future__ import annotations

import hashlib
import uuid
from datetime import date, datetime, timedelta

from app.db import SessionLocal, engine
from app.models import (
    Attendance,
    AuditLog,
    Base,
    Client,
    Course,
    Deal,
    GroupStudent,
    Lesson,
    Role,
    StudyGroup,
    Task,
    User,
    UserSession,
)

ROLES = ["администратор", "менеджер", "преподаватель", "аноним"]

USERS = [
    {
        "email": "admin@example.com",
        "password": "admin123A",
        "first_name": "Иван",
        "second_name": "Иванов",
        "patronymic": "Иванович",
        "role": "администратор",
        "phone": "+7-999-100-00-01",
        "is_accepted": True,
        "income_per_hour": 1200.0,
    },
    {
        "email": "manager@example.com",
        "password": "manager123A",
        "first_name": "Петр",
        "second_name": "Петров",
        "patronymic": "Петрович",
        "role": "менеджер",
        "phone": "+7-999-100-00-02",
        "is_accepted": True,
        "income_per_hour": 650.0,
    },
    {
        "email": "teacher@example.com",
        "password": "teacher123A",
        "first_name": "Анна",
        "second_name": "Сидорова",
        "patronymic": "Алексеевна",
        "role": "преподаватель",
        "phone": "+7-999-100-00-03",
        "is_accepted": True,
        "income_per_hour": 450.0,
    },
    {
        "email": "teacher2@example.com",
        "password": "teacher123B",
        "first_name": "Олег",
        "second_name": "Козлов",
        "patronymic": "Сергеевич",
        "role": "преподаватель",
        "phone": "+7-999-100-00-04",
        "is_accepted": True,
        "income_per_hour": 430.0,
    },
    {
        "email": "teacher3@example.com",
        "password": "teacher123C",
        "first_name": "Марина",
        "second_name": "Белова",
        "patronymic": "Игоревна",
        "role": "преподаватель",
        "phone": "+7-999-100-00-05",
        "is_accepted": True,
        "income_per_hour": 470.0,
    },
]

COURSES = [
    {"name": "WEB-дизайн", "cost": 36000, "lesson_cost": 2200, "lesson_count": 18, "module_count": 4},
    {"name": "Python разработчик", "cost": 48000, "lesson_cost": 2600, "lesson_count": 20, "module_count": 5},
    {"name": "Frontend React", "cost": 42000, "lesson_cost": 2400, "lesson_count": 18, "module_count": 4},
    {"name": "Английский для начинающих", "cost": 19000, "lesson_cost": 1400, "lesson_count": 16, "module_count": 3},
    {"name": "Разговорный английский", "cost": 22000, "lesson_cost": 1600, "lesson_count": 16, "module_count": 3},
    {"name": "Подготовка к IELTS", "cost": 39000, "lesson_cost": 2700, "lesson_count": 20, "module_count": 5},
]

CLIENTS = [
    ("Мария", "Петрова", "Сергеевна", date(2010, 5, 15), "Петрова Елена Ивановна", "+7-901-000-00-11", "elena.petrov@example.com", "ребенок,new"),
    ("Артем", "Петров", "Сергеевич", date(2011, 1, 19), "Петрова Елена Ивановна", "+7-901-000-00-11", "elena.petrov@example.com", "ребенок"),
    ("Дмитрий", "Смирнов", "Ильич", date(2007, 9, 2), "Смирнова Татьяна Павловна", "+7-901-000-00-12", "t.sm@example.com", "олимпиада"),
    ("Виктория", "Смирнова", "Ильинична", date(2009, 11, 30), "Смирнова Татьяна Павловна", "+7-901-000-00-12", "t.sm@example.com", "подготовка к экзамену"),
    ("Кирилл", "Кузнецов", "Андреевич", date(2005, 7, 7), "Кузнецова Нина Сергеевна", "+7-901-000-00-13", "nina.k@example.com", "взрослый,python"),
    ("Ирина", "Кузнецова", "Андреевна", date(1999, 3, 22), None, "+7-901-000-00-14", "irina.k@example.com", "frontend"),
    ("Никита", "Орлов", "Михайлович", date(2008, 12, 1), "Орлова Марина Игоревна", "+7-901-000-00-15", "marina.orlova@example.com", "дизайн"),
    ("Полина", "Орлова", "Михайловна", date(2012, 8, 9), "Орлова Марина Игоревна", "+7-901-000-00-15", "marina.orlova@example.com", "дизайн,ребенок"),
    ("Егор", "Соловьев", "Олегович", date(2006, 6, 6), "Соловьева Светлана Павловна", "+7-901-000-00-16", "solovyeva.s@example.com", "react"),
    ("Алина", "Соколова", "Павловна", date(2004, 4, 4), None, "+7-901-000-00-17", "alina.s@example.com", "python,advanced"),
    ("Тимур", "Васильев", "Романович", date(2003, 2, 14), None, "+7-901-000-00-18", "timur.v@example.com", "ielts"),
    ("Елизавета", "Федорова", "Романовна", date(2013, 10, 3), "Федорова Анна Викторовна", "+7-901-000-00-19", "anna.fedorova@example.com", "английский,ребенок"),
    ("Глеб", "Макаров", "Юрьевич", date(2001, 1, 21), None, "+7-901-000-00-20", "gleb.m@example.com", "career"),
    ("Ксения", "Попова", "Игоревна", date(2000, 9, 17), None, "+7-901-000-00-21", "ksenia.p@example.com", "design,portfolio"),
]

GROUPS = [
    ("WEB-дизайн Утро", "WEB-дизайн", "teacher@example.com", "Вт/Чт 10:00-11:30", "301"),
    ("Python Разработчик Вечер", "Python разработчик", "teacher@example.com", "Пн/Ср 19:00-20:30", "302"),
    ("React Проектная", "Frontend React", "teacher2@example.com", "Вт/Чт 18:00-19:30", "201"),
    ("English A1 Weekend", "Английский для начинающих", "teacher3@example.com", "Сб/Вс 11:00-12:30", "105"),
    ("Speaking Club", "Разговорный английский", "teacher3@example.com", "Пн/Ср 18:30-20:00", "106"),
    ("IELTS Intensive", "Подготовка к IELTS", "teacher2@example.com", "Пн/Пт 17:00-18:30", "203"),
]

# group_name -> (topic_prefix, weekday(0=Mon), hour, minute, duration_min, recurring_weeks)
LESSON_TEMPLATES = {
    "WEB-дизайн Утро": ("WEB", 1, 10, 0, 90, 8),
    "Python Разработчик Вечер": ("Python", 0, 19, 0, 90, 8),
    "React Проектная": ("React", 1, 18, 0, 90, 6),
    "English A1 Weekend": ("A1", 5, 11, 0, 90, 6),
    "Speaking Club": ("Speaking", 0, 18, 30, 90, 6),
    "IELTS Intensive": ("IELTS", 0, 17, 0, 90, 7),
}

TASK_TITLES = [
    "Подтвердить оплату",
    "Созвон с родителем",
    "Подготовить материалы",
    "Проверить домашнее задание",
    "Назначить пробный урок",
    "Сформировать отчет по группе",
]


def stable_session_id(seed: str) -> str:
    return hashlib.sha256(seed.encode("utf-8")).hexdigest()[:48]


def get_or_create_role(db, name: str) -> Role:
    role = db.query(Role).filter(Role.name == name).first()
    if role:
        return role
    role = Role(name=name)
    db.add(role)
    db.flush()
    return role


def get_or_create_user(db, row: dict[str, object], role_id: int) -> User:
    user = db.query(User).filter(User.email == row["email"]).first()
    if user:
        return user
    user = User(
        email=str(row["email"]),
        first_name=str(row["first_name"]),
        second_name=str(row["second_name"]),
        patronymic=str(row["patronymic"]) if row["patronymic"] is not None else None,
        phone=str(row["phone"]) if row["phone"] else None,
        role_id=role_id,
        is_accepted=bool(row["is_accepted"]),
        income_per_hour=float(row["income_per_hour"]),
    )
    user.set_password(str(row["password"]))
    db.add(user)
    db.flush()
    return user


def get_or_create_course(db, row: dict[str, object]) -> Course:
    course = db.query(Course).filter(Course.name == row["name"]).first()
    if course:
        return course
    course = Course(
        name=str(row["name"]),
        cost=float(row["cost"]),
        lesson_cost=float(row["lesson_cost"]),
        lesson_count=int(row["lesson_count"]),
        module_count=int(row["module_count"]),
    )
    db.add(course)
    db.flush()
    return course


def get_or_create_client(db, row: tuple[str, str, str | None, date, str | None, str | None, str | None, str | None]) -> Client:
    first_name, second_name, patronymic, dob, parent_name, parent_phone, parent_email, tags = row
    client = (
        db.query(Client)
        .filter(
            Client.first_name == first_name,
            Client.second_name == second_name,
            Client.patronymic == patronymic,
            Client.parent_phone == parent_phone,
        )
        .first()
    )
    if client:
        return client
    client = Client(
        first_name=first_name,
        second_name=second_name,
        patronymic=patronymic,
        date_of_birth=dob,
        parent_full_name=parent_name,
        parent_phone=parent_phone,
        parent_email=parent_email,
        tags=tags,
    )
    db.add(client)
    db.flush()
    return client


def get_or_create_group(db, name: str, course_id: int, teacher_id: int | None, schedule_text: str | None, audience: str | None) -> StudyGroup:
    group = db.query(StudyGroup).filter(StudyGroup.name == name).first()
    if group:
        return group
    group = StudyGroup(
        name=name,
        course_id=course_id,
        teacher_id=teacher_id,
        schedule_text=schedule_text,
        audience=audience,
    )
    db.add(group)
    db.flush()
    return group


def add_student_to_group_if_missing(db, group_id: int, client_id: int) -> None:
    exists = (
        db.query(GroupStudent)
        .filter(GroupStudent.group_id == group_id, GroupStudent.client_id == client_id)
        .first()
    )
    if not exists:
        db.add(GroupStudent(group_id=group_id, client_id=client_id))


def find_next_weekday(base: datetime, weekday: int, hour: int, minute: int) -> datetime:
    current = base.replace(hour=hour, minute=minute, second=0, microsecond=0)
    days_ahead = (weekday - current.weekday()) % 7
    return current + timedelta(days=days_ahead)


def get_or_create_lesson(
    db,
    group_id: int,
    topic: str,
    start_at: datetime,
    end_at: datetime,
    recurrence_group_id: str,
    is_conducted: bool = False,
) -> Lesson:
    lesson = (
        db.query(Lesson)
        .filter(
            Lesson.group_id == group_id,
            Lesson.topic == topic,
            Lesson.start_at == start_at,
        )
        .first()
    )
    if lesson:
        return lesson
    lesson = Lesson(
        group_id=group_id,
        topic=topic,
        start_at=start_at,
        end_at=end_at,
        materials_url="https://example.com/materials",
        comment="Демо-урок для тестирования",
        is_conducted=is_conducted,
        is_recurring_weekly=True,
        recurrence_group_id=recurrence_group_id,
    )
    db.add(lesson)
    db.flush()
    return lesson


def get_or_create_attendance(db, lesson_id: int, client_id: int, status: str, comment: str | None) -> None:
    row = (
        db.query(Attendance)
        .filter(Attendance.lesson_id == lesson_id, Attendance.client_id == client_id)
        .first()
    )
    if row:
        return
    db.add(
        Attendance(
            lesson_id=lesson_id,
            client_id=client_id,
            status=status,
            comment=comment,
        )
    )


def get_or_create_deal(db, client_id: int, manager_id: int, stage: str, amount: float, deadline: datetime, status: str) -> Deal:
    deal = (
        db.query(Deal)
        .filter(Deal.client_id == client_id, Deal.stage == stage, Deal.amount == amount)
        .first()
    )
    if deal:
        return deal
    deal = Deal(
        client_id=client_id,
        manager_id=manager_id,
        stage=stage,
        amount=amount,
        deadline=deadline,
        status=status,
    )
    db.add(deal)
    db.flush()
    return deal


def get_or_create_task(
    db,
    title: str,
    description: str,
    assignee_id: int,
    creator_id: int,
    client_id: int | None,
    deal_id: int | None,
    priority: str,
    deadline: datetime | None,
    status: str,
) -> None:
    task = (
        db.query(Task)
        .filter(Task.title == title, Task.assignee_id == assignee_id, Task.client_id == client_id)
        .first()
    )
    if task:
        return
    db.add(
        Task(
            title=title,
            description=description,
            assignee_id=assignee_id,
            creator_id=creator_id,
            client_id=client_id,
            deal_id=deal_id,
            priority=priority,
            deadline=deadline,
            status=status,
        )
    )


def get_or_create_session(
    db,
    user_id: int,
    marker: str,
    is_active: bool,
    ip: str,
    ua: str,
    started_at: datetime,
) -> UserSession:
    sid = stable_session_id(f"{user_id}:{marker}")
    session = db.query(UserSession).filter(UserSession.session_id == sid).first()
    if session:
        return session
    session = UserSession(
        session_id=sid,
        user_id=user_id,
        ip_address=ip,
        user_agent=ua,
        started_at=started_at,
        last_seen_at=started_at + timedelta(minutes=15),
        ended_at=None if is_active else started_at + timedelta(hours=2),
        refresh_token_hash=hashlib.sha256(f"refresh:{sid}".encode("utf-8")).hexdigest(),
        expires_at=started_at + timedelta(days=14),
        revoked_at=None if is_active else started_at + timedelta(hours=2),
        is_active=is_active,
    )
    db.add(session)
    db.flush()
    return session


def get_or_create_audit_log(
    db,
    user_id: int | None,
    session_id: str | None,
    action: str,
    method: str,
    path: str,
    status_code: int,
    created_at: datetime,
    details: str | None = None,
) -> None:
    row = (
        db.query(AuditLog)
        .filter(
            AuditLog.user_id == user_id,
            AuditLog.session_id == session_id,
            AuditLog.action == action,
            AuditLog.path == path,
            AuditLog.created_at == created_at,
        )
        .first()
    )
    if row:
        return
    db.add(
        AuditLog(
            user_id=user_id,
            session_id=session_id,
            action=action,
            method=method,
            path=path,
            status_code=status_code,
            ip_address="127.0.0.1",
            user_agent="seed-script/1.0",
            details=details,
            is_reviewed=False,
            review_note=None,
            created_at=created_at,
        )
    )


def main() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    now = datetime.utcnow().replace(second=0, microsecond=0)
    monday = now - timedelta(days=now.weekday())

    try:
        roles: dict[str, Role] = {name: get_or_create_role(db, name) for name in ROLES}
        users_by_email: dict[str, User] = {}
        for user_row in USERS:
            user = get_or_create_user(db, user_row, roles[str(user_row["role"])].id)
            users_by_email[user.email] = user

        courses_by_name: dict[str, Course] = {}
        for course_row in COURSES:
            course = get_or_create_course(db, course_row)
            courses_by_name[course.name] = course

        clients: list[Client] = [get_or_create_client(db, row) for row in CLIENTS]

        groups_by_name: dict[str, StudyGroup] = {}
        for group_name, course_name, teacher_email, schedule_text, audience in GROUPS:
            teacher = users_by_email.get(teacher_email)
            group = get_or_create_group(
                db,
                name=group_name,
                course_id=courses_by_name[course_name].id,
                teacher_id=teacher.id if teacher else None,
                schedule_text=schedule_text,
                audience=audience,
            )
            groups_by_name[group_name] = group

        # distribute students among groups
        group_names = list(groups_by_name.keys())
        for idx, client in enumerate(clients):
            primary_group = groups_by_name[group_names[idx % len(group_names)]]
            add_student_to_group_if_missing(db, primary_group.id, client.id)
            # every third student joins an extra group to test multi-group cases
            if idx % 3 == 0:
                secondary_group = groups_by_name[group_names[(idx + 1) % len(group_names)]]
                add_student_to_group_if_missing(db, secondary_group.id, client.id)

        # lessons + attendance
        status_cycle = ["present", "late", "absent", "present"]
        for group_name, group in groups_by_name.items():
            topic_prefix, weekday, hour, minute, duration_min, weeks = LESSON_TEMPLATES[group_name]
            first_start = find_next_weekday(monday, weekday, hour, minute)
            recurrence_group_id = uuid.uuid5(uuid.NAMESPACE_DNS, f"seed:{group_name}").hex[:20]

            group_students = (
                db.query(Client)
                .join(GroupStudent, GroupStudent.client_id == Client.id)
                .filter(GroupStudent.group_id == group.id)
                .order_by(Client.id)
                .all()
            )

            for lesson_idx in range(weeks):
                start_at = first_start + timedelta(days=7 * lesson_idx)
                end_at = start_at + timedelta(minutes=duration_min)
                lesson = get_or_create_lesson(
                    db,
                    group_id=group.id,
                    topic=f"{topic_prefix} • занятие {lesson_idx + 1}",
                    start_at=start_at,
                    end_at=end_at,
                    recurrence_group_id=recurrence_group_id,
                    is_conducted=lesson_idx < 3,
                )

                for student_idx, student in enumerate(group_students):
                    status = status_cycle[(lesson_idx + student_idx) % len(status_cycle)]
                    comment = None
                    if status == "late":
                        comment = "Опоздание на 10 минут"
                    elif status == "absent":
                        comment = "Предупредил заранее"
                    get_or_create_attendance(db, lesson.id, student.id, status=status, comment=comment)

        manager = users_by_email["manager@example.com"]
        admin = users_by_email["admin@example.com"]
        teachers = [
            users_by_email["teacher@example.com"],
            users_by_email["teacher2@example.com"],
            users_by_email["teacher3@example.com"],
        ]

        # deals
        stages = ["Первичный контакт", "Переговоры", "Счет выставлен", "Оплачено"]
        deals: list[Deal] = []
        for idx, client in enumerate(clients[:10]):
            stage = stages[idx % len(stages)]
            amount = 18000 + idx * 2300
            status = "won" if stage == "Оплачено" else "active"
            deal = get_or_create_deal(
                db,
                client_id=client.id,
                manager_id=manager.id,
                stage=stage,
                amount=amount,
                deadline=now + timedelta(days=5 + idx),
                status=status,
            )
            deals.append(deal)

        # tasks
        for idx, title in enumerate(TASK_TITLES * 2):
            assignee = teachers[idx % len(teachers)] if idx % 2 == 0 else manager
            client_ref = clients[idx % len(clients)]
            deal_ref = deals[idx % len(deals)] if deals else None
            get_or_create_task(
                db,
                title=f"{title} #{idx + 1}",
                description="Сгенерированная демо-задача для тестирования фильтров и статусов.",
                assignee_id=assignee.id,
                creator_id=admin.id,
                client_id=client_ref.id,
                deal_id=deal_ref.id if deal_ref else None,
                priority=["low", "medium", "high"][idx % 3],
                deadline=now + timedelta(days=(idx % 9) + 1),
                status=["open", "in_progress", "done"][idx % 3],
            )

        # sessions and logs
        sessions: list[UserSession] = []
        for idx, user in enumerate(users_by_email.values()):
            sessions.append(
                get_or_create_session(
                    db,
                    user_id=user.id,
                    marker="active",
                    is_active=True,
                    ip=f"192.168.10.{10 + idx}",
                    ua="Mozilla/5.0 (Macintosh; Intel Mac OS X) Chrome/123.0",
                    started_at=now - timedelta(hours=idx + 1),
                )
            )
            sessions.append(
                get_or_create_session(
                    db,
                    user_id=user.id,
                    marker="old",
                    is_active=False,
                    ip=f"10.0.1.{20 + idx}",
                    ua="Mozilla/5.0 (Windows NT 10.0) Firefox/123.0",
                    started_at=now - timedelta(days=idx + 3),
                )
            )

        common_paths = ["/calendar", "/clients", "/deals", "/tasks", "/archive", "/admin/activity/users"]
        actions = ["http_request", "http_request", "http_error", "auth_login", "auth_refresh", "session_terminated"]
        for idx, session in enumerate(sessions):
            user_id = session.user_id
            for log_idx in range(8):
                created_at = now - timedelta(hours=idx, minutes=log_idx * 7)
                action = actions[(idx + log_idx) % len(actions)]
                path = common_paths[(idx + log_idx) % len(common_paths)]
                status_code = 500 if action == "http_error" else 200
                details = f"seed log {idx}-{log_idx}"
                get_or_create_audit_log(
                    db,
                    user_id=user_id,
                    session_id=session.session_id,
                    action=action,
                    method=["GET", "POST", "PATCH", "DELETE"][(idx + log_idx) % 4],
                    path=path,
                    status_code=status_code,
                    created_at=created_at,
                    details=details,
                )

        db.commit()
        print("Database initialized with extended demo data for all models.")

        stats = {
            "roles": db.query(Role).count(),
            "users": db.query(User).count(),
            "courses": db.query(Course).count(),
            "clients": db.query(Client).count(),
            "groups": db.query(StudyGroup).count(),
            "group_students": db.query(GroupStudent).count(),
            "lessons": db.query(Lesson).count(),
            "attendance": db.query(Attendance).count(),
            "deals": db.query(Deal).count(),
            "tasks": db.query(Task).count(),
            "user_sessions": db.query(UserSession).count(),
            "audit_logs": db.query(AuditLog).count(),
        }
        print("Current totals:", stats)

    except Exception as exc:
        db.rollback()
        print(f"Error while seeding database: {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
