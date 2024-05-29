import smtplib
from email.mime.text import MIMEText
import os

from orm.user import User
from observability.log import log
from notifications.notifiers.notifier import Notifier


SUBJECT = "Flower Shop"
BODY = "This is the body of the text message"
SENDER = os.environ.get("GMAIL_USER", "")
PASSWORD = os.environ.get("GMAIL_PASSWORD", "")


class GmailNotifier(Notifier):

    def __init__(self) -> None:
        super().__init__()

        self.smtp = self.__open_smtp_connection()
        self.smtp.login(SENDER, PASSWORD)

    def send(self, recipient: User, message: str):
        self.__send_email(
            message,
            [
                recipient.email,
            ],
        )

    def __open_smtp_connection(self):
        return smtplib.SMTP_SSL("smtp.gmail.com", 465)

    def __send_email(self, body: str, recipients: list[str]):
        msg = MIMEText(body)
        msg["Subject"] = SUBJECT
        msg["From"] = SENDER
        msg["To"] = ", ".join(recipients)

        self.smtp.sendmail(SENDER, recipients, msg.as_string())
