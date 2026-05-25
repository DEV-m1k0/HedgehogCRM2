#!/bin/sh
set -e

echo "Checking database seed state..."

SHOULD_SEED="$(python - <<'PY'
from app.db import SessionLocal, engine
from app.models import Base, Client, Course, Deal, Lesson, StudyGroup, Task, User

Base.metadata.create_all(bind=engine)

db = SessionLocal()
try:
    models = (User, Client, Course, StudyGroup, Lesson, Deal, Task)
    has_application_data = any(db.query(model.id).first() is not None for model in models)
    print("0" if has_application_data else "1")
finally:
    db.close()
PY
)"

if [ "$SHOULD_SEED" = "1" ]; then
    echo "Database is empty; loading initial demo data..."
    python create_initial_database.py
else
    echo "Database already contains application data; skipping initial demo data."
fi

exec "$@"
