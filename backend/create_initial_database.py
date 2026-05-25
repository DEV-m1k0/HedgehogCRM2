from __future__ import annotations

import hashlib
import random
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

# ---------------------------------------------------------------------------
# Reference data
# ---------------------------------------------------------------------------

ROLES = ["администратор", "менеджер", "преподаватель", "аноним"]

USERS = [
    # --- Admins ---
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
        "telegram_contact": "@ivanov_admin",
        "vk_contact": "vk.com/ivanov_admin",
    },
    {
        "email": "admin2@example.com",
        "password": "admin123B",
        "first_name": "Сергей",
        "second_name": "Николаев",
        "patronymic": "Викторович",
        "role": "администратор",
        "phone": "+7-999-100-00-06",
        "is_accepted": True,
        "income_per_hour": 1100.0,
        "telegram_contact": "@nikolaev_admin",
    },
    # --- Managers ---
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
        "telegram_contact": "@petrov_mgr",
        "whatsapp_contact": "+79991000002",
    },
    {
        "email": "manager2@example.com",
        "password": "manager123B",
        "first_name": "Елена",
        "second_name": "Кравцова",
        "patronymic": "Дмитриевна",
        "role": "менеджер",
        "phone": "+7-999-100-00-07",
        "is_accepted": True,
        "income_per_hour": 620.0,
        "telegram_contact": "@kravtsova_mgr",
    },
    {
        "email": "manager3@example.com",
        "password": "manager123C",
        "first_name": "Дмитрий",
        "second_name": "Волков",
        "patronymic": "Александрович",
        "role": "менеджер",
        "phone": "+7-999-100-00-08",
        "is_accepted": True,
        "income_per_hour": 600.0,
        "whatsapp_contact": "+79991000008",
    },
    # --- Teachers ---
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
        "telegram_contact": "@sidorova_t",
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
        "telegram_contact": "@kozlov_t",
        "vk_contact": "vk.com/kozlov_teach",
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
        "whatsapp_contact": "+79991000005",
    },
    {
        "email": "teacher4@example.com",
        "password": "teacher123D",
        "first_name": "Наталья",
        "second_name": "Морозова",
        "patronymic": "Владимировна",
        "role": "преподаватель",
        "phone": "+7-999-100-00-09",
        "is_accepted": True,
        "income_per_hour": 500.0,
        "telegram_contact": "@morozova_t",
    },
    {
        "email": "teacher5@example.com",
        "password": "teacher123E",
        "first_name": "Алексей",
        "second_name": "Жуков",
        "patronymic": "Николаевич",
        "role": "преподаватель",
        "phone": "+7-999-100-00-10",
        "is_accepted": True,
        "income_per_hour": 480.0,
        "vk_contact": "vk.com/zhukov_design",
    },
    {
        "email": "teacher6@example.com",
        "password": "teacher123F",
        "first_name": "Виктория",
        "second_name": "Лебедева",
        "patronymic": "Андреевна",
        "role": "преподаватель",
        "phone": "+7-999-100-00-11",
        "is_accepted": True,
        "income_per_hour": 460.0,
        "telegram_contact": "@lebedeva_eng",
    },
    {
        "email": "teacher7@example.com",
        "password": "teacher123G",
        "first_name": "Андрей",
        "second_name": "Романов",
        "patronymic": "Павлович",
        "role": "преподаватель",
        "phone": "+7-999-100-00-12",
        "is_accepted": True,
        "income_per_hour": 520.0,
        "telegram_contact": "@romanov_dev",
    },
    # --- Anonymous (pending) ---
    {
        "email": "tatiana.m@example.com",
        "password": "newuser123A",
        "first_name": "Татьяна",
        "second_name": "Миронова",
        "patronymic": "Сергеевна",
        "role": "аноним",
        "phone": "+7-999-200-00-01",
        "is_accepted": False,
        "income_per_hour": 0.0,
    },
    {
        "email": "maxim.o@example.com",
        "password": "newuser123B",
        "first_name": "Максим",
        "second_name": "Орлов",
        "patronymic": "Дмитриевич",
        "role": "аноним",
        "phone": "+7-999-200-00-02",
        "is_accepted": False,
        "income_per_hour": 0.0,
    },
    {
        "email": "julia.f@example.com",
        "password": "newuser123C",
        "first_name": "Юлия",
        "second_name": "Федорова",
        "patronymic": "Романовна",
        "role": "аноним",
        "phone": "+7-999-200-00-03",
        "is_accepted": False,
        "income_per_hour": 0.0,
    },
]

COURSES = [
    {"name": "WEB-дизайн", "cost": 36000, "lesson_cost": 2200, "lesson_count": 18, "module_count": 4},
    {"name": "Python разработчик", "cost": 48000, "lesson_cost": 2600, "lesson_count": 20, "module_count": 5},
    {"name": "Frontend React", "cost": 42000, "lesson_cost": 2400, "lesson_count": 18, "module_count": 4},
    {"name": "Английский для начинающих", "cost": 19000, "lesson_cost": 1400, "lesson_count": 16, "module_count": 3},
    {"name": "Разговорный английский", "cost": 22000, "lesson_cost": 1600, "lesson_count": 16, "module_count": 3},
    {"name": "Подготовка к IELTS", "cost": 39000, "lesson_cost": 2700, "lesson_count": 20, "module_count": 5},
    {"name": "Java разработка", "cost": 45000, "lesson_cost": 2500, "lesson_count": 20, "module_count": 5},
    {"name": "Мобильная разработка", "cost": 52000, "lesson_cost": 2800, "lesson_count": 20, "module_count": 5},
    {"name": "Data Science и ML", "cost": 55000, "lesson_cost": 3000, "lesson_count": 22, "module_count": 6},
    {"name": "Графический дизайн", "cost": 32000, "lesson_cost": 2000, "lesson_count": 18, "module_count": 4},
    {"name": "Немецкий язык A1", "cost": 21000, "lesson_cost": 1500, "lesson_count": 16, "module_count": 3},
    {"name": "Видеомонтаж", "cost": 28000, "lesson_cost": 1800, "lesson_count": 16, "module_count": 3},
]

# (first, second, patronymic, dob, parent_name, parent_phone, parent_email, tags, created_days_ago)
CLIENTS: list[tuple[str, str, str | None, date, str | None, str | None, str | None, str | None, int]] = [
    ("Мария", "Петрова", "Сергеевна", date(2010, 5, 15), "Петрова Елена Ивановна", "+7-901-000-00-11", "elena.petrov@mail.ru", "ребенок,web-дизайн", 85),
    ("Артем", "Петров", "Сергеевич", date(2011, 1, 19), "Петрова Елена Ивановна", "+7-901-000-00-11", "elena.petrov@mail.ru", "ребенок,web-дизайн", 85),
    ("Дмитрий", "Смирнов", "Ильич", date(2007, 9, 2), "Смирнова Татьяна Павловна", "+7-901-000-00-12", "t.smirnova@mail.ru", "олимпиада,python", 80),
    ("Виктория", "Смирнова", "Ильинична", date(2009, 11, 30), "Смирнова Татьяна Павловна", "+7-901-000-00-12", "t.smirnova@mail.ru", "подготовка к экзамену,английский", 78),
    ("Кирилл", "Кузнецов", "Андреевич", date(2005, 7, 7), "Кузнецова Нина Сергеевна", "+7-901-000-00-13", "nina.k@mail.ru", "python,advanced", 75),
    ("Ирина", "Кузнецова", "Андреевна", date(1999, 3, 22), None, "+7-901-000-00-14", "irina.k@gmail.com", "frontend,react", 72),
    ("Никита", "Орлов", "Михайлович", date(2008, 12, 1), "Орлова Марина Игоревна", "+7-901-000-00-15", "marina.orlova@mail.ru", "дизайн,графика", 70),
    ("Полина", "Орлова", "Михайловна", date(2012, 8, 9), "Орлова Марина Игоревна", "+7-901-000-00-15", "marina.orlova@mail.ru", "дизайн,ребенок", 70),
    ("Егор", "Соловьев", "Олегович", date(2006, 6, 6), "Соловьева Светлана Павловна", "+7-901-000-00-16", "solovyeva.s@mail.ru", "react,frontend", 68),
    ("Алина", "Соколова", "Павловна", date(2004, 4, 4), None, "+7-901-000-00-17", "alina.s@gmail.com", "python,data-science", 65),
    ("Тимур", "Васильев", "Романович", date(2003, 2, 14), None, "+7-901-000-00-18", "timur.v@gmail.com", "ielts,английский", 62),
    ("Елизавета", "Федорова", "Романовна", date(2013, 10, 3), "Федорова Анна Викторовна", "+7-901-000-00-19", "anna.fedorova@mail.ru", "английский,ребенок", 60),
    ("Глеб", "Макаров", "Юрьевич", date(2001, 1, 21), None, "+7-901-000-00-20", "gleb.m@gmail.com", "java,career", 58),
    ("Ксения", "Попова", "Игоревна", date(2000, 9, 17), None, "+7-901-000-00-21", "ksenia.p@gmail.com", "design,portfolio", 55),
    ("Роман", "Захаров", "Дмитриевич", date(2006, 3, 11), "Захарова Ольга Петровна", "+7-901-000-00-22", "olga.zaharova@mail.ru", "python,олимпиада", 53),
    ("Анастасия", "Михайлова", "Александровна", date(2008, 7, 25), "Михайлова Ирина Владимировна", "+7-901-000-00-23", "i.mikhailova@mail.ru", "web-дизайн,ребенок", 50),
    ("Даниил", "Новиков", "Евгеньевич", date(2005, 11, 8), "Новикова Марина Сергеевна", "+7-901-000-00-24", "m.novikova@mail.ru", "java,python", 48),
    ("София", "Егорова", "Артемовна", date(2010, 2, 28), "Егорова Людмила Николаевна", "+7-901-000-00-25", "l.egorova@mail.ru", "английский,ребенок", 45),
    ("Максим", "Козлов", "Денисович", date(2004, 8, 16), None, "+7-901-000-00-26", "max.kozlov@gmail.com", "react,frontend,advanced", 43),
    ("Валерия", "Лебедева", "Олеговна", date(2007, 5, 3), "Лебедева Наталья Юрьевна", "+7-901-000-00-27", "n.lebedeva@mail.ru", "дизайн,графика", 40),
    ("Александр", "Морозов", "Игоревич", date(2002, 12, 20), None, "+7-901-000-00-28", "a.morozov@gmail.com", "data-science,python,ml", 38),
    ("Екатерина", "Волкова", "Сергеевна", date(1998, 6, 9), None, "+7-901-000-00-29", "e.volkova@gmail.com", "ielts,advanced", 36),
    ("Михаил", "Алексеев", "Романович", date(2009, 4, 14), "Алексеева Татьяна Михайловна", "+7-901-000-00-30", "t.alekseeva@mail.ru", "python,ребенок", 34),
    ("Дарья", "Сергеева", "Владимировна", date(2006, 1, 7), "Сергеева Ольга Алексеевна", "+7-901-000-00-31", "o.sergeeva@mail.ru", "английский,немецкий", 32),
    ("Илья", "Павлов", "Андреевич", date(2003, 10, 30), None, "+7-901-000-00-32", "ilya.pavlov@gmail.com", "мобильная разработка,java", 30),
    ("Арина", "Семенова", "Дмитриевна", date(2011, 9, 12), "Семенова Вера Николаевна", "+7-901-000-00-33", "v.semenova@mail.ru", "web-дизайн,ребенок", 28),
    ("Тимофей", "Голубев", "Алексеевич", date(2005, 6, 18), "Голубева Ирина Петровна", "+7-901-000-00-34", "i.golubeva@mail.ru", "python,react", 26),
    ("Вероника", "Виноградова", "Михайловна", date(2008, 3, 5), "Виноградова Мария Ивановна", "+7-901-000-00-35", "m.vinogradova@mail.ru", "графика,дизайн", 24),
    ("Степан", "Богданов", "Юрьевич", date(2004, 7, 22), None, "+7-901-000-00-36", "s.bogdanov@gmail.com", "java,backend", 22),
    ("Милана", "Воробьева", "Артемовна", date(2012, 11, 1), "Воробьева Екатерина Сергеевна", "+7-901-000-00-37", "e.vorobyeva@mail.ru", "английский,ребенок", 20),
    ("Матвей", "Фролов", "Николаевич", date(2007, 2, 15), "Фролова Анна Дмитриевна", "+7-901-000-00-38", "a.frolova@mail.ru", "react,frontend", 18),
    ("Алиса", "Дмитриева", "Владиславовна", date(2009, 8, 8), "Дмитриева Светлана Олеговна", "+7-901-000-00-39", "s.dmitrieva@mail.ru", "английский,ребенок", 16),
    ("Лев", "Калинин", "Максимович", date(2003, 5, 29), None, "+7-901-000-00-40", "lev.kalinin@gmail.com", "data-science,ml,python", 14),
    ("Варвара", "Анисимова", "Григорьевна", date(2006, 12, 10), "Анисимова Людмила Борисовна", "+7-901-000-00-41", "l.anisimova@mail.ru", "немецкий,английский", 12),
    ("Денис", "Белов", "Станиславович", date(2002, 4, 25), None, "+7-901-000-00-42", "d.belov@gmail.com", "мобильная разработка,flutter", 11),
    ("Ульяна", "Комарова", "Евгеньевна", date(2010, 7, 13), "Комарова Ирина Александровна", "+7-901-000-00-43", "i.komarova@mail.ru", "web-дизайн,ребенок", 10),
    ("Артур", "Григорьев", "Тимурович", date(2005, 9, 4), "Григорьева Фатима Ахмедовна", "+7-901-000-00-44", "f.grigorieva@mail.ru", "python,java", 9),
    ("Ева", "Титова", "Ильинична", date(2011, 1, 30), "Титова Мария Сергеевна", "+7-901-000-00-45", "m.titova@mail.ru", "дизайн,ребенок", 8),
    ("Руслан", "Куликов", "Олегович", date(2004, 11, 17), None, "+7-901-000-00-46", "r.kulikov@gmail.com", "react,typescript", 7),
    ("Елена", "Андреева", "Константиновна", date(1997, 3, 8), None, "+7-901-000-00-47", "e.andreeva@gmail.com", "ielts,career,advanced", 6),
    ("Владислав", "Гусев", "Романович", date(2008, 6, 21), "Гусева Ольга Витальевна", "+7-901-000-00-48", "o.guseva@mail.ru", "python,ребенок", 5),
    ("Мирослава", "Киселева", "Данииловна", date(2007, 10, 5), "Киселева Нина Георгиевна", "+7-901-000-00-49", "n.kiseleva@mail.ru", "английский", 4),
    ("Платон", "Медведев", "Артемович", date(2006, 8, 14), "Медведева Вера Ильинична", "+7-901-000-00-50", "v.medvedeva@mail.ru", "data-science,python", 3),
    ("Кира", "Щербакова", "Львовна", date(2009, 5, 27), "Щербакова Анна Владимировна", "+7-901-000-00-51", "a.scherbakova@mail.ru", "графика,дизайн", 3),
    ("Георгий", "Баранов", "Вадимович", date(2003, 2, 3), None, "+7-901-000-00-52", "g.baranov@gmail.com", "java,spring,career", 2),
    ("Таисия", "Пономарева", "Глебовна", date(2012, 4, 19), "Пономарева Светлана Алексеевна", "+7-901-000-00-53", "s.ponomareva@mail.ru", "английский,ребенок", 2),
    ("Марк", "Абрамов", "Евгеньевич", date(2005, 12, 31), "Абрамова Екатерина Дмитриевна", "+7-901-000-00-54", "e.abramova@mail.ru", "react,frontend", 1),
    ("Диана", "Сорокина", "Витальевна", date(2010, 3, 16), "Сорокина Юлия Петровна", "+7-901-000-00-55", "y.sorokina@mail.ru", "web-дизайн,ребенок", 1),
    ("Богдан", "Мухин", "Артемович", date(2004, 9, 9), None, "+7-901-000-00-56", "b.mukhin@gmail.com", "мобильная разработка,kotlin", 1),
    ("Аделина", "Калашникова", "Робертовна", date(2008, 11, 22), "Калашникова Регина Ильдаровна", "+7-901-000-00-57", "r.kalashnikova@mail.ru", "немецкий,английский,ребенок", 0),
]

# (group_name, course_name, teacher_email, schedule_text, audience)
GROUPS = [
    ("WEB-дизайн Утро", "WEB-дизайн", "teacher@example.com", "Вт/Чт 10:00-11:30", "301"),
    ("WEB-дизайн Вечер", "WEB-дизайн", "teacher5@example.com", "Пн/Ср 18:00-19:30", "301"),
    ("Python Разработчик Вечер", "Python разработчик", "teacher@example.com", "Пн/Ср 19:00-20:30", "302"),
    ("Python Интенсив", "Python разработчик", "teacher4@example.com", "Вт/Чт/Сб 17:00-18:30", "302"),
    ("React Проектная", "Frontend React", "teacher2@example.com", "Вт/Чт 18:00-19:30", "201"),
    ("React Продвинутый", "Frontend React", "teacher7@example.com", "Ср/Пт 19:00-20:30", "201"),
    ("English A1 Weekend", "Английский для начинающих", "teacher3@example.com", "Сб/Вс 11:00-12:30", "105"),
    ("English A1 Утро", "Английский для начинающих", "teacher6@example.com", "Вт/Чт 09:00-10:30", "105"),
    ("Speaking Club", "Разговорный английский", "teacher3@example.com", "Пн/Ср 18:30-20:00", "106"),
    ("IELTS Intensive", "Подготовка к IELTS", "teacher6@example.com", "Пн/Пт 17:00-18:30", "203"),
    ("Java Начинающие", "Java разработка", "teacher2@example.com", "Пн/Ср 10:00-11:30", "204"),
    ("Java Продвинутый", "Java разработка", "teacher7@example.com", "Вт/Чт 19:30-21:00", "204"),
    ("Mobile Dev iOS", "Мобильная разработка", "teacher4@example.com", "Пн/Ср 17:00-18:30", "205"),
    ("Mobile Dev Android", "Мобильная разработка", "teacher7@example.com", "Сб 10:00-13:00", "205"),
    ("Data Science Основы", "Data Science и ML", "teacher4@example.com", "Вт/Чт 19:00-20:30", "206"),
    ("Графический дизайн Утро", "Графический дизайн", "teacher5@example.com", "Вт/Чт 10:00-11:30", "103"),
    ("Графический дизайн Вечер", "Графический дизайн", "teacher5@example.com", "Пн/Ср 19:30-21:00", "103"),
    ("Немецкий A1", "Немецкий язык A1", "teacher3@example.com", "Ср/Пт 18:00-19:30", "107"),
    ("Видеомонтаж Практика", "Видеомонтаж", "teacher5@example.com", "Сб 14:00-17:00", "108"),
    ("Видеомонтаж Онлайн", "Видеомонтаж", "teacher5@example.com", "Вт 20:00-21:30", "онлайн"),
]

# group_name -> list of (topic_prefix, weekday_offset, hour, minute, duration_min)
# weekday_offset: 0=Mon 1=Tue 2=Wed 3=Thu 4=Fri 5=Sat 6=Sun
LESSON_SCHEDULES: dict[str, list[tuple[str, int, int, int, int]]] = {
    "WEB-дизайн Утро": [("WEB", 1, 10, 0, 90), ("WEB", 3, 10, 0, 90)],
    "WEB-дизайн Вечер": [("WEB", 0, 18, 0, 90), ("WEB", 2, 18, 0, 90)],
    "Python Разработчик Вечер": [("Python", 0, 19, 0, 90), ("Python", 2, 19, 0, 90)],
    "Python Интенсив": [("Python-I", 1, 17, 0, 90), ("Python-I", 3, 17, 0, 90), ("Python-I", 5, 17, 0, 90)],
    "React Проектная": [("React", 1, 18, 0, 90), ("React", 3, 18, 0, 90)],
    "React Продвинутый": [("React-A", 2, 19, 0, 90), ("React-A", 4, 19, 0, 90)],
    "English A1 Weekend": [("A1", 5, 11, 0, 90), ("A1", 6, 11, 0, 90)],
    "English A1 Утро": [("A1-M", 1, 9, 0, 90), ("A1-M", 3, 9, 0, 90)],
    "Speaking Club": [("Speak", 0, 18, 30, 90), ("Speak", 2, 18, 30, 90)],
    "IELTS Intensive": [("IELTS", 0, 17, 0, 90), ("IELTS", 4, 17, 0, 90)],
    "Java Начинающие": [("Java", 0, 10, 0, 90), ("Java", 2, 10, 0, 90)],
    "Java Продвинутый": [("Java-A", 1, 19, 30, 90), ("Java-A", 3, 19, 30, 90)],
    "Mobile Dev iOS": [("iOS", 0, 17, 0, 90), ("iOS", 2, 17, 0, 90)],
    "Mobile Dev Android": [("Android", 5, 10, 0, 180)],
    "Data Science Основы": [("DS", 1, 19, 0, 90), ("DS", 3, 19, 0, 90)],
    "Графический дизайн Утро": [("GD", 1, 10, 0, 90), ("GD", 3, 10, 0, 90)],
    "Графический дизайн Вечер": [("GD-E", 0, 19, 30, 90), ("GD-E", 2, 19, 30, 90)],
    "Немецкий A1": [("DE", 2, 18, 0, 90), ("DE", 4, 18, 0, 90)],
    "Видеомонтаж Практика": [("Video", 5, 14, 0, 180)],
    "Видеомонтаж Онлайн": [("Video-O", 1, 20, 0, 90)],
}

WEEKS_BACK = 12
WEEKS_FORWARD = 4

# Student -> group assignment mapping (client index -> list of group names)
# This is generated dynamically, but we define explicit assignments for the
# first batch to ensure meaningful distributions.
GROUP_STUDENT_MAP: dict[str, list[int]] = {
    "WEB-дизайн Утро": [0, 1, 7, 15, 25, 35, 47],
    "WEB-дизайн Вечер": [6, 19, 27, 37, 43],
    "Python Разработчик Вечер": [2, 4, 9, 14, 22, 26, 36],
    "Python Интенсив": [16, 20, 32, 40, 42],
    "React Проектная": [5, 8, 17, 30, 38, 46],
    "React Продвинутый": [18, 26, 38],
    "English A1 Weekend": [3, 11, 23, 29, 31, 41, 45],
    "English A1 Утро": [17, 24, 33, 49],
    "Speaking Club": [3, 10, 21, 39, 41],
    "IELTS Intensive": [10, 21, 39],
    "Java Начинающие": [12, 16, 28, 36, 44],
    "Java Продвинутый": [24, 28, 44],
    "Mobile Dev iOS": [24, 34, 48],
    "Mobile Dev Android": [13, 34, 48],
    "Data Science Основы": [9, 20, 32, 42],
    "Графический дизайн Утро": [6, 7, 19, 27, 37, 43],
    "Графический дизайн Вечер": [13, 37, 43],
    "Немецкий A1": [23, 33, 49],
    "Видеомонтаж Практика": [13, 19, 27],
    "Видеомонтаж Онлайн": [6, 37],
}

DEAL_STAGES = ["Первичный контакт", "Переговоры", "Счет выставлен", "Оплачено"]

TASK_TEMPLATES = [
    ("Подтвердить оплату за курс", "Связаться с клиентом и подтвердить получение оплаты. Проверить поступление средств на счет."),
    ("Созвон с родителем", "Провести телефонный разговор с родителем ученика для обсуждения успеваемости и расписания."),
    ("Подготовить материалы к уроку", "Подготовить презентацию, примеры кода и домашнее задание для предстоящего занятия."),
    ("Проверить домашнее задание", "Проверить выполненные задания учеников, оставить комментарии и выставить оценки."),
    ("Назначить пробный урок", "Связаться с потенциальным учеником и назначить дату и время пробного занятия."),
    ("Сформировать отчет по группе", "Подготовить ежемесячный отчет по успеваемости группы для руководства."),
    ("Обновить расписание", "Согласовать и обновить расписание занятий на следующий месяц с преподавателями."),
    ("Отправить напоминание об оплате", "Отправить клиентам напоминания о предстоящей оплате за следующий месяц обучения."),
    ("Провести тестирование", "Организовать и провести промежуточное тестирование по пройденному материалу."),
    ("Подготовить сертификат", "Оформить сертификат об окончании курса для выпускника."),
    ("Собрать обратную связь", "Провести анкетирование учеников и родителей для оценки качества обучения."),
    ("Обзвонить новых лидов", "Обзвонить новые заявки с сайта и из соцсетей, записать на пробное занятие."),
    ("Настроить вебинар", "Подготовить техническую часть для онлайн-вебинара: проверить камеру, микрофон, демо-материалы."),
    ("Разобрать конфликтную ситуацию", "Связаться с родителем по жалобе и решить вопрос о переводе ученика в другую группу."),
    ("Обновить учебную программу", "Актуализировать план курса с учетом новых технологий и обратной связи учеников."),
    ("Заказать расходные материалы", "Заказать маркеры, бумагу и канцтовары для аудиторий на следующий месяц."),
    ("Провести собеседование преподавателя", "Провести собеседование с кандидатом на должность преподавателя Python."),
    ("Подготовить акцию для соцсетей", "Разработать промо-пост о скидке для новых учеников и согласовать с маркетологом."),
    ("Проверить оборудование в аудитории", "Проверить проекторы, компьютеры и Wi-Fi во всех аудиториях перед началом недели."),
    ("Организовать открытый урок", "Спланировать открытый урок для родителей: тема, формат, приглашения."),
]

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edge/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/125.0.6422.52 Mobile Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
]

AUDIT_PATHS = [
    "/calendar", "/clients", "/clients", "/clients",
    "/deals", "/deals",
    "/tasks", "/tasks",
    "/schedule/lessons", "/schedule/lessons", "/schedule/lessons",
    "/courses", "/groups", "/groups",
    "/archive", "/admin/activity/users",
    "/auth/refresh",
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

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


def get_or_create_user(db, row: dict, role_id: int, created_at: datetime | None = None) -> User:
    user = db.query(User).filter(User.email == row["email"]).first()
    if user:
        return user
    user = User(
        email=str(row["email"]),
        first_name=str(row["first_name"]),
        second_name=str(row["second_name"]),
        patronymic=str(row["patronymic"]) if row.get("patronymic") else None,
        phone=str(row["phone"]) if row.get("phone") else None,
        role_id=role_id,
        is_accepted=bool(row.get("is_accepted", False)),
        income_per_hour=float(row.get("income_per_hour", 0)),
        telegram_contact=row.get("telegram_contact"),
        vk_contact=row.get("vk_contact"),
        whatsapp_contact=row.get("whatsapp_contact"),
    )
    if created_at:
        user.created_at = created_at
    user.set_password(str(row["password"]))
    db.add(user)
    db.flush()
    return user


def get_or_create_course(db, row: dict) -> Course:
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


def get_or_create_client(db, row: tuple, now: datetime) -> Client:
    first_name, second_name, patronymic, dob, parent_name, parent_phone, parent_email, tags, days_ago = row
    client = (
        db.query(Client)
        .filter(
            Client.first_name == first_name,
            Client.second_name == second_name,
            Client.patronymic == patronymic,
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
        created_at=now - timedelta(days=days_ago),
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


def find_weekday_in_week(base_monday: datetime, weekday: int, hour: int, minute: int) -> datetime:
    return base_monday.replace(hour=hour, minute=minute, second=0, microsecond=0) + timedelta(days=weekday)


def get_or_create_lesson(
    db,
    group_id: int,
    topic: str,
    lesson_type: str,
    start_at: datetime,
    end_at: datetime,
    recurrence_group_id: str,
    is_conducted: bool = False,
    is_cancelled: bool = False,
    materials_url: str | None = None,
    comment: str | None = None,
) -> Lesson:
    lesson = (
        db.query(Lesson)
        .filter(Lesson.group_id == group_id, Lesson.start_at == start_at)
        .first()
    )
    if lesson:
        return lesson
    lesson = Lesson(
        group_id=group_id,
        topic=topic,
        lesson_type=lesson_type,
        start_at=start_at,
        end_at=end_at,
        materials_url=materials_url,
        comment=comment,
        is_conducted=is_conducted,
        is_cancelled=is_cancelled,
        is_recurring_weekly=True,
        recurrence_group_id=recurrence_group_id,
    )
    db.add(lesson)
    db.flush()
    return lesson


def get_or_create_attendance(
    db,
    lesson_id: int,
    client_id: int,
    status: str,
    comment: str | None,
    hedgehogs: int = 0,
    absent_marked_by_user_id: int | None = None,
) -> None:
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
            hedgehogs=hedgehogs,
            absent_marked_by_user_id=absent_marked_by_user_id,
        )
    )


def get_or_create_deal(
    db,
    client_id: int,
    manager_id: int,
    stage: str,
    amount: float,
    deadline: datetime | None,
    status: str,
    created_at: datetime | None = None,
) -> Deal:
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
    if created_at:
        deal.created_at = created_at
        deal.updated_at = created_at
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
    created_at: datetime | None = None,
) -> None:
    task = (
        db.query(Task)
        .filter(Task.title == title, Task.assignee_id == assignee_id)
        .first()
    )
    if task:
        return
    t = Task(
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
    if created_at:
        t.created_at = created_at
    db.add(t)


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
        last_seen_at=started_at + timedelta(minutes=random.randint(5, 120)),
        ended_at=None if is_active else started_at + timedelta(hours=random.randint(1, 8)),
        refresh_token_hash=hashlib.sha256(f"refresh:{sid}".encode("utf-8")).hexdigest(),
        expires_at=started_at + timedelta(days=14),
        revoked_at=None if is_active else started_at + timedelta(hours=random.randint(1, 8)),
        is_active=is_active,
    )
    db.add(session)
    db.flush()
    return session


def bulk_add_audit_logs(db, logs: list[dict]) -> None:
    existing = set()
    for log in logs:
        key = (log.get("user_id"), log.get("session_id"), log.get("action"), log.get("path"), log.get("created_at"))
        if key in existing:
            continue
        existing.add(key)
        db.add(AuditLog(**log))


# ---------------------------------------------------------------------------
# Lesson topic generators
# ---------------------------------------------------------------------------

TOPIC_TEMPLATES: dict[str, list[str]] = {
    "WEB": [
        "Введение в HTML и структура страницы",
        "Основы CSS: селекторы и свойства",
        "Flexbox и Grid-раскладки",
        "Адаптивный дизайн и медиа-запросы",
        "Основы типографики для веба",
        "Цветовые схемы и палитры",
        "Создание макета в Figma",
        "Прототипирование интерфейсов",
        "Работа с изображениями и иконками",
        "CSS-анимации и переходы",
        "Введение в JavaScript для дизайнеров",
        "Интерактивные элементы и формы",
        "UX-принципы и юзабилити",
        "Тестирование на устройствах",
        "Публикация сайта на хостинге",
        "Итоговый проект: лендинг",
        "Разбор ошибок и рефакторинг",
        "Защита финального проекта",
    ],
    "Python": [
        "Введение в Python: переменные и типы данных",
        "Условные конструкции и циклы",
        "Функции и области видимости",
        "Строки, списки и словари",
        "Работа с файлами и исключениями",
        "Модули и пакеты",
        "ООП: классы и объекты",
        "ООП: наследование и полиморфизм",
        "Работа с базами данных (SQLite)",
        "SQL-запросы из Python",
        "Введение в Flask/FastAPI",
        "REST API: маршруты и запросы",
        "Авторизация и JWT",
        "Тестирование кода (pytest)",
        "Работа с Git и GitHub",
        "Деплой приложения",
        "Алгоритмы сортировки и поиска",
        "Финальный проект: веб-сервис",
        "Ревью кода и рефакторинг",
        "Защита проекта",
    ],
    "Python-I": [
        "Python: быстрый старт",
        "Структуры данных: углубленно",
        "Генераторы и декораторы",
        "Асинхронное программирование",
        "Работа с API (requests, httpx)",
        "Парсинг данных (BeautifulSoup)",
        "Pandas: введение в анализ данных",
        "NumPy: массивы и операции",
        "Визуализация (Matplotlib)",
        "Введение в машинное обучение",
        "Scikit-learn: первые модели",
        "Обработка текстов (NLP основы)",
        "Docker для Python-разработчика",
        "CI/CD и автоматизация",
        "Микросервисная архитектура",
        "Финальный проект: pipeline",
        "Код-ревью и оптимизация",
        "Защита проекта",
        "Подготовка к собеседованию",
        "Карьерная консультация",
    ],
    "React": [
        "Введение в React и JSX",
        "Компоненты и props",
        "Состояние (useState)",
        "Обработка событий",
        "Списки и ключи",
        "useEffect и жизненный цикл",
        "Формы и управляемые компоненты",
        "React Router: навигация",
        "Контекст и useContext",
        "Запросы к API (fetch/axios)",
        "React Query для серверного состояния",
        "Zustand для глобального состояния",
        "CSS-модули и Styled Components",
        "Оптимизация: memo, useMemo, useCallback",
        "TypeScript + React",
        "Тестирование компонентов",
        "Next.js: серверный рендеринг",
        "Финальный проект: SPA",
    ],
    "React-A": [
        "Архитектура React-приложений",
        "Паттерны: HOC, Render Props, Hooks",
        "Кастомные хуки",
        "Продвинутый TypeScript в React",
        "Серверные компоненты и RSC",
        "Performance: профилирование и DevTools",
        "Анимации (Framer Motion)",
        "Тестирование: RTL + MSW",
        "Storybook для компонентов",
        "Monorepo и Turborepo",
        "CI/CD для фронтенда",
        "Финальный проект: enterprise-SPA",
        "Ревью и рефакторинг",
        "Подготовка к собеседованию",
        "Карьерная консультация",
        "Разбор реальных кейсов",
        "Best practices и антипаттерны",
        "Защита проекта",
    ],
    "A1": [
        "Знакомство и приветствие",
        "Алфавит и произношение",
        "Числа и даты",
        "Семья и друзья",
        "Мой дом и комната",
        "Еда и напитки",
        "В магазине",
        "Распорядок дня",
        "Хобби и свободное время",
        "Погода и времена года",
        "Города и путешествия",
        "В ресторане (диалог)",
        "Прошедшее время (Past Simple)",
        "Планы на будущее (Going to)",
        "Повторение и тест",
        "Итоговое занятие",
    ],
    "A1-M": [
        "Greetings and introductions",
        "The alphabet and spelling",
        "Numbers, dates and time",
        "Family vocabulary",
        "Home and furniture",
        "Food and drinks",
        "Shopping dialogues",
        "Daily routine",
        "Hobbies and free time",
        "Weather and seasons",
        "Transport and travel",
        "At the restaurant",
        "Past Simple practice",
        "Future plans: Going to",
        "Review and mini-test",
        "Final lesson and certificate",
    ],
    "Speak": [
        "Ice-breakers and small talk",
        "Describing people and places",
        "Telling stories (past events)",
        "Debating: pros and cons",
        "Role-play: job interview",
        "Role-play: at the airport",
        "Discussing movies and books",
        "News discussion",
        "Cultural differences",
        "Technology and gadgets",
        "Health and lifestyle",
        "Education and career",
        "Environment and ecology",
        "Travel experiences",
        "Presentation skills",
        "Final discussion club",
    ],
    "IELTS": [
        "IELTS overview and strategies",
        "Listening: Section 1-2 practice",
        "Listening: Section 3-4 practice",
        "Reading: skimming and scanning",
        "Reading: True/False/Not Given",
        "Reading: matching headings",
        "Writing Task 1: graphs and charts",
        "Writing Task 1: process diagrams",
        "Writing Task 2: opinion essay",
        "Writing Task 2: discussion essay",
        "Speaking Part 1 practice",
        "Speaking Part 2: long turn",
        "Speaking Part 3: discussion",
        "Vocabulary for IELTS topics",
        "Grammar review for writing",
        "Mock test: full paper",
        "Mock test review and feedback",
        "Exam tips and final prep",
        "Last-minute strategies",
        "Q&A and confidence building",
    ],
    "Java": [
        "Введение в Java и JDK",
        "Переменные и типы данных",
        "Условия и циклы",
        "Массивы и коллекции",
        "Методы и рекурсия",
        "ООП: классы и объекты",
        "Наследование и интерфейсы",
        "Исключения и обработка ошибок",
        "Работа с файлами (I/O)",
        "Generics и коллекции",
        "Stream API",
        "Многопоточность (основы)",
        "JDBC и базы данных",
        "Maven и зависимости",
        "Spring Boot: первые шаги",
        "REST API на Spring",
        "Spring Security (основы)",
        "Тестирование (JUnit, Mockito)",
        "Финальный проект",
        "Защита проекта",
    ],
    "Java-A": [
        "Архитектура Spring-приложений",
        "Spring Data JPA",
        "Транзакции и кеширование",
        "Микросервисы (Spring Cloud)",
        "Docker для Java",
        "Kafka и очереди сообщений",
        "gRPC и protobuf",
        "Реактивное программирование (WebFlux)",
        "Мониторинг (Actuator, Prometheus)",
        "CI/CD для Java-проектов",
        "Паттерны проектирования",
        "DDD: Domain-Driven Design",
        "Performance tuning (JVM, GC)",
        "Безопасность: OAuth2 + JWT",
        "Финальный проект: микросервис",
        "Код-ревью",
        "Подготовка к собеседованию",
        "Защита проекта",
        "Карьерные советы",
        "Разбор реальных кейсов",
    ],
    "iOS": [
        "Введение в Swift",
        "Переменные и управляющие конструкции",
        "Функции и замыкания",
        "ООП в Swift",
        "Протоколы и расширения",
        "UIKit: первый экран",
        "Auto Layout и constraints",
        "Навигация (UINavigationController)",
        "Таблицы и коллекции",
        "Сетевые запросы (URLSession)",
        "JSON parsing (Codable)",
        "Core Data (основы)",
        "SwiftUI: введение",
        "SwiftUI: списки и навигация",
        "Анимации в SwiftUI",
        "Публикация в App Store",
        "Тестирование (XCTest)",
        "Финальный проект: iOS-приложение",
        "Ревью и рефакторинг",
        "Защита проекта",
    ],
    "Android": [
        "Введение в Kotlin",
        "Основы Kotlin: функции и классы",
        "Android Studio и структура проекта",
        "Activity и жизненный цикл",
        "Layouts и Views",
        "RecyclerView и адаптеры",
        "Навигация (Navigation Component)",
        "Retrofit и сетевые запросы",
        "Room Database",
        "MVVM архитектура",
        "Jetpack Compose: основы",
        "Compose: списки и состояние",
        "Notifications и WorkManager",
        "Google Maps API",
        "Firebase (Auth + Firestore)",
        "Публикация в Google Play",
        "Тестирование (Espresso)",
        "Финальный проект: Android-приложение",
        "Ревью и рефакторинг",
        "Защита проекта",
    ],
    "DS": [
        "Введение в Data Science",
        "Python для анализа данных",
        "Pandas: загрузка и очистка данных",
        "Визуализация (Matplotlib, Seaborn)",
        "Статистика: описательная и вывод",
        "Корреляция и регрессия",
        "Scikit-learn: классификация",
        "Деревья решений и ансамбли",
        "Кластеризация (K-Means)",
        "Обработка текстов (TF-IDF, NLP)",
        "Нейронные сети: введение",
        "Keras/TensorFlow: первая модель",
        "Сверточные нейросети (CNN)",
        "Рекуррентные нейросети (RNN)",
        "Transfer Learning",
        "Feature Engineering",
        "Модели на реальных данных",
        "MLOps: основы деплоя моделей",
        "Kaggle-соревнование",
        "Финальный проект и презентация",
        "Защита проекта",
        "Карьерная консультация",
    ],
    "GD": [
        "Введение в графический дизайн",
        "Основы композиции",
        "Теория цвета",
        "Типографика: шрифты и верстка",
        "Adobe Photoshop: основы",
        "Photoshop: ретушь и коллажи",
        "Adobe Illustrator: вектор",
        "Illustrator: логотипы и иконки",
        "Figma: интерфейсы",
        "Figma: компоненты и стили",
        "Дизайн баннеров и постов",
        "Брендбук: создание айдентики",
        "Дизайн упаковки",
        "Мокапы и презентация работ",
        "Портфолио на Behance",
        "Фриланс для дизайнера",
        "Итоговый проект: фирменный стиль",
        "Защита проекта",
    ],
    "GD-E": [
        "Композиция и визуальная иерархия",
        "Цветовые модели и палитры",
        "Шрифтовые пары и типографика",
        "Photoshop: продвинутые техники",
        "Illustrator: сложный вектор",
        "Figma: Auto Layout и варианты",
        "Motion Graphics (After Effects)",
        "3D-графика: введение (Blender)",
        "UI-дизайн мобильного приложения",
        "UX-исследования и карта пути",
        "Дизайн для печати",
        "Инфографика и визуализация данных",
        "Персональный бренд дизайнера",
        "Проект: редизайн реального продукта",
        "Ревью портфолио",
        "Подготовка к собеседованию",
        "Итоговый проект",
        "Защита проекта",
    ],
    "DE": [
        "Das Alphabet und Aussprache",
        "Begrüßung und Vorstellung",
        "Zahlen und Uhrzeiten",
        "Familie und Freunde",
        "Essen und Trinken",
        "Im Supermarkt einkaufen",
        "Meine Wohnung",
        "Tagesablauf und Freizeit",
        "Verkehrsmittel und Reisen",
        "Beim Arzt",
        "Wetter und Jahreszeiten",
        "Beruf und Arbeit",
        "Perfekt: прошедшее время",
        "Modalverben: können, müssen, wollen",
        "Wiederholung und Test",
        "Abschlusslektion und Zertifikat",
    ],
    "Video": [
        "Введение в видеомонтаж",
        "Интерфейс DaVinci Resolve",
        "Импорт и организация материалов",
        "Базовый монтаж: таймлайн",
        "Переходы и эффекты",
        "Работа со звуком",
        "Цветокоррекция: основы",
        "Цветокоррекция: продвинутая",
        "Титры и графика",
        "Motion Graphics (Fusion)",
        "Монтаж для YouTube",
        "Монтаж для Instagram/TikTok",
        "Экспорт и форматы видео",
        "Проект: рекламный ролик",
        "Проект: влог",
        "Защита проекта",
    ],
    "Video-O": [
        "Знакомство с программой",
        "Организация медиа-библиотеки",
        "Монтаж: склейки и обрезки",
        "Переходы и скорость",
        "Звук: музыка, голос, эффекты",
        "Цвет: LUTs и грейдинг",
        "Титры и нижние трети",
        "Кеинг (хромакей)",
        "Монтаж интервью",
        "Монтаж для соцсетей",
        "Стабилизация и ретайминг",
        "Проект: видеопортфолио",
        "Экспорт и оптимизация",
        "Фриланс для видеомейкера",
        "Итоговый проект",
        "Защита проекта",
    ],
}


# ---------------------------------------------------------------------------
# Main seeder
# ---------------------------------------------------------------------------

def main() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    rng = random.Random(42)
    now = datetime.utcnow().replace(second=0, microsecond=0)
    today_monday = now - timedelta(days=now.weekday())

    try:
        # --- Roles ---
        roles: dict[str, Role] = {name: get_or_create_role(db, name) for name in ROLES}

        # --- Users ---
        users_by_email: dict[str, User] = {}
        for idx, user_row in enumerate(USERS):
            created_at = now - timedelta(days=90 - idx * 2)
            user = get_or_create_user(db, user_row, roles[str(user_row["role"])].id, created_at)
            users_by_email[user.email] = user

        # --- Courses ---
        courses_by_name: dict[str, Course] = {}
        for course_row in COURSES:
            course = get_or_create_course(db, course_row)
            courses_by_name[course.name] = course

        # --- Clients ---
        clients: list[Client] = [get_or_create_client(db, row, now) for row in CLIENTS]

        # --- Groups ---
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

        # --- Assign students to groups ---
        for group_name, client_indices in GROUP_STUDENT_MAP.items():
            group = groups_by_name[group_name]
            for ci in client_indices:
                if ci < len(clients):
                    add_student_to_group_if_missing(db, group.id, clients[ci].id)

        db.flush()

        # --- Lessons + Attendance ---
        status_pool = ["present", "present", "present", "late", "absent"]
        comments_by_status = {
            "present": [None, None, None, "Активно работал на уроке", "Отличная работа!"],
            "late": ["Опоздал на 5 минут", "Опоздал на 10 минут", "Опоздал на 15 минут", "Задержался на предыдущем занятии"],
            "absent": ["Предупредил заранее", "Заболел", "Семейные обстоятельства", "Не предупредил", "Уехал на соревнование"],
        }
        materials_urls = [
            "https://drive.google.com/materials/lesson",
            "https://notion.so/hedgehog/materials",
            "https://github.com/hedgehog-crm/course-materials",
            None,
        ]

        all_teachers = [u for u in users_by_email.values() if u.role_id == roles["преподаватель"].id]

        for group_name, group in groups_by_name.items():
            schedules = LESSON_SCHEDULES.get(group_name, [])
            if not schedules:
                continue

            recurrence_group_id = uuid.uuid5(uuid.NAMESPACE_DNS, f"seed:{group_name}").hex[:20]
            topic_prefix = schedules[0][0]
            topics = TOPIC_TEMPLATES.get(topic_prefix, [])

            group_students = (
                db.query(Client)
                .join(GroupStudent, GroupStudent.client_id == Client.id)
                .filter(GroupStudent.group_id == group.id)
                .order_by(Client.id)
                .all()
            )

            lesson_counter = 0
            for week_offset in range(-WEEKS_BACK, WEEKS_FORWARD + 1):
                week_monday = today_monday + timedelta(weeks=week_offset)

                for sched_idx, (tp, weekday, hour, minute, duration) in enumerate(schedules):
                    start_at = find_weekday_in_week(week_monday, weekday, hour, minute)
                    end_at = start_at + timedelta(minutes=duration)

                    is_past = start_at < now
                    is_cancelled = is_past and rng.random() < 0.05
                    is_conducted = is_past and not is_cancelled

                    topic_idx = lesson_counter % len(topics) if topics else 0
                    topic = topics[topic_idx] if topics else f"{tp} • занятие {lesson_counter + 1}"

                    lesson = get_or_create_lesson(
                        db,
                        group_id=group.id,
                        topic=topic,
                        lesson_type="group",
                        start_at=start_at,
                        end_at=end_at,
                        recurrence_group_id=recurrence_group_id,
                        is_conducted=is_conducted,
                        is_cancelled=is_cancelled,
                        materials_url=rng.choice(materials_urls),
                        comment=f"Занятие {lesson_counter + 1}" if rng.random() < 0.3 else None,
                    )

                    if is_conducted and group_students:
                        for si, student in enumerate(group_students):
                            status = rng.choice(status_pool)
                            comment = rng.choice(comments_by_status[status])
                            hedgehogs = rng.randint(0, 5) if status == "present" else 0
                            absent_by = group.teacher_id if status == "absent" else None
                            get_or_create_attendance(
                                db,
                                lesson.id,
                                student.id,
                                status=status,
                                comment=comment,
                                hedgehogs=hedgehogs,
                                absent_marked_by_user_id=absent_by,
                            )

                    lesson_counter += 1

        db.flush()

        # --- Deals ---
        managers = [u for e, u in users_by_email.items() if u.role_id == roles["менеджер"].id]
        deals: list[Deal] = []

        deal_configs = []
        for ci in range(min(45, len(clients))):
            stage_idx = rng.randint(0, len(DEAL_STAGES) - 1)
            stage = DEAL_STAGES[stage_idx]
            amount = rng.choice([19000, 22000, 28000, 32000, 36000, 39000, 42000, 45000, 48000, 52000, 55000])
            status = "won" if stage == "Оплачено" else ("lost" if rng.random() < 0.08 else "active")
            days_ago = rng.randint(1, 80)
            deadline_delta = rng.randint(5, 30)
            deal_configs.append((ci, stage, amount, status, days_ago, deadline_delta))

        for ci, stage, amount, status, days_ago, dd in deal_configs:
            manager = rng.choice(managers)
            created_at = now - timedelta(days=days_ago)
            deal = get_or_create_deal(
                db,
                client_id=clients[ci].id,
                manager_id=manager.id,
                stage=stage,
                amount=float(amount),
                deadline=now + timedelta(days=dd) if status == "active" else None,
                status=status,
                created_at=created_at,
            )
            deals.append(deal)

        db.flush()

        # --- Tasks ---
        admin_user = users_by_email["admin@example.com"]
        all_assignable = managers + all_teachers

        for task_idx in range(80):
            tmpl_idx = task_idx % len(TASK_TEMPLATES)
            title_base, description = TASK_TEMPLATES[tmpl_idx]
            title = f"{title_base} #{task_idx + 1}"
            assignee = rng.choice(all_assignable)
            creator = rng.choice([admin_user] + managers)
            client_ref = clients[task_idx % len(clients)]
            deal_ref = deals[task_idx % len(deals)] if deals else None
            priority = rng.choice(["low", "medium", "medium", "high"])
            days_ago = rng.randint(0, 60)
            deadline_days = rng.randint(1, 14)

            if days_ago > 20:
                status = rng.choice(["done", "done", "done", "in_progress"])
            elif days_ago > 7:
                status = rng.choice(["in_progress", "in_progress", "done", "open"])
            else:
                status = rng.choice(["open", "open", "in_progress"])

            get_or_create_task(
                db,
                title=title,
                description=description,
                assignee_id=assignee.id,
                creator_id=creator.id,
                client_id=client_ref.id,
                deal_id=deal_ref.id if deal_ref else None,
                priority=priority,
                deadline=now + timedelta(days=deadline_days),
                status=status,
                created_at=now - timedelta(days=days_ago),
            )

        db.flush()

        # --- Sessions ---
        sessions: list[UserSession] = []
        accepted_users = [u for u in users_by_email.values() if u.is_accepted]

        for user in accepted_users:
            sessions.append(
                get_or_create_session(
                    db,
                    user_id=user.id,
                    marker="current",
                    is_active=True,
                    ip=f"192.168.10.{rng.randint(10, 250)}",
                    ua=rng.choice(USER_AGENTS),
                    started_at=now - timedelta(hours=rng.randint(1, 4)),
                )
            )
            for hist_idx in range(rng.randint(3, 8)):
                sessions.append(
                    get_or_create_session(
                        db,
                        user_id=user.id,
                        marker=f"hist_{hist_idx}",
                        is_active=False,
                        ip=f"10.0.{rng.randint(1, 10)}.{rng.randint(10, 250)}",
                        ua=rng.choice(USER_AGENTS),
                        started_at=now - timedelta(days=rng.randint(1, 85), hours=rng.randint(0, 12)),
                    )
                )

        db.flush()

        # --- Audit Logs ---
        audit_actions = ["http_request", "http_request", "http_request", "http_request",
                         "http_error", "auth_login", "auth_refresh", "auth_logout",
                         "client_created", "client_updated", "deal_created", "deal_updated",
                         "task_created", "task_updated", "lesson_created", "attendance_marked"]
        audit_methods = ["GET", "GET", "GET", "POST", "PATCH", "DELETE"]

        logs_batch: list[dict] = []
        for session in sessions:
            num_logs = rng.randint(5, 30)
            for log_idx in range(num_logs):
                action = rng.choice(audit_actions)
                path = rng.choice(AUDIT_PATHS)
                method = rng.choice(audit_methods)
                status_code = 500 if action == "http_error" else (201 if method == "POST" else 200)
                hours_offset = rng.randint(0, 72)
                minutes_offset = rng.randint(0, 59)
                created_at = session.started_at + timedelta(hours=hours_offset % 8, minutes=minutes_offset)

                logs_batch.append({
                    "user_id": session.user_id,
                    "session_id": session.session_id,
                    "action": action,
                    "method": method,
                    "path": path,
                    "status_code": status_code,
                    "ip_address": session.ip_address,
                    "user_agent": session.user_agent or "seed-script/2.0",
                    "details": f"duration_ms={rng.randint(5, 800)}",
                    "is_reviewed": False,
                    "review_note": None,
                    "created_at": created_at,
                })

        for day_offset in range(90):
            daily_events = rng.randint(8, 25)
            for _ in range(daily_events):
                user = rng.choice(accepted_users)
                action = rng.choice(audit_actions)
                path = rng.choice(AUDIT_PATHS)
                method = rng.choice(audit_methods)
                status_code = 500 if action == "http_error" else (201 if method == "POST" else 200)
                created_at = now - timedelta(days=day_offset, hours=rng.randint(8, 21), minutes=rng.randint(0, 59))

                logs_batch.append({
                    "user_id": user.id,
                    "session_id": None,
                    "action": action,
                    "method": method,
                    "path": path,
                    "status_code": status_code,
                    "ip_address": f"192.168.{rng.randint(1, 20)}.{rng.randint(1, 254)}",
                    "user_agent": rng.choice(USER_AGENTS),
                    "details": f"duration_ms={rng.randint(10, 500)}",
                    "is_reviewed": False,
                    "review_note": None,
                    "created_at": created_at,
                })

        bulk_add_audit_logs(db, logs_batch)

        db.commit()
        print("=" * 60)
        print("  Database seeded with comprehensive demo data!")
        print("=" * 60)

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
        total = sum(stats.values())
        for entity, count in stats.items():
            print(f"  {entity:20s}: {count}")
        print(f"  {'TOTAL':20s}: {total}")
        print("=" * 60)

    except Exception as exc:
        db.rollback()
        print(f"Error while seeding database: {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
