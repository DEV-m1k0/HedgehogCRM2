import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg['Subject'] = 'Тема письма'
msg['From'] = 'anthon.knyzev@yandex.ru'
msg['To'] = 'knyzevanton8@gmail.com'
msg.set_content('Привет! Это сообщение отправлено с помощью пароля приложения.')

try:
    # Порт 465 используется для SMTP_SSL
    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        # ВАЖНО: здесь должен быть пароль приложения, а не основной!
        server.login('anthon.knyzev@yandex.ru', 'zeotuyqixxgrxgxz')
        server.send_message(msg)
    print("Письмо успешно отправлено!")
except Exception as e:
    print(f"Ошибка: {e}")
