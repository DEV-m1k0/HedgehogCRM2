from __future__ import annotations

import os
import smtplib
from email.message import EmailMessage


def notifications_enabled() -> bool:
    # Disabled by default. Enable explicitly via EMAIL_NOTIFICATIONS_ENABLED=1.
    return os.getenv("EMAIL_NOTIFICATIONS_ENABLED", "0").strip().lower() in {"1", "true", "yes"}


def smtp_config() -> dict[str, object]:
    return {
        "host": os.getenv("SMTP_HOST", "").strip(),
        "port": int(os.getenv("SMTP_PORT", "587")),
        "username": os.getenv("SMTP_USERNAME", "").strip(),
        "password": os.getenv("SMTP_PASSWORD", "").strip(),
        "from_email": os.getenv("SMTP_FROM", "").strip(),
        "starttls": os.getenv("SMTP_STARTTLS", "1").strip().lower() in {"1", "true", "yes"},
    }


def smtp_is_configured() -> bool:
    cfg = smtp_config()
    return bool(cfg["host"]) and bool(cfg["from_email"])


def send_plain_email(*, to_email: str, subject: str, body: str) -> None:
    if not notifications_enabled():
        raise RuntimeError("Email notifications are disabled")

    cfg = smtp_config()
    host = str(cfg["host"])
    from_email = str(cfg["from_email"])
    if not host or not from_email:
        raise RuntimeError("SMTP not configured: set SMTP_HOST and SMTP_FROM")

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = from_email
    message["To"] = to_email
    message.set_content(body)

    with smtplib.SMTP(host, int(cfg["port"]), timeout=20) as server:
        if bool(cfg["starttls"]):
            server.starttls()
        username = str(cfg["username"])
        password = str(cfg["password"])
        if username:
            server.login(username, password)
        server.send_message(message)
