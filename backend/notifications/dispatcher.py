from orm.user import User
from notifications.notifiers.notifier import Notifier


class NotificationDispatcher:
    def __init__(self):
        self.notifiers: list[Notifier] = []

    def send(self, recipient: User, message: str):
        for notifier in self.notifiers:
            notifier.send(recipient, message)

    def register_notifier(self, notifier: Notifier):
        self.notifiers.append(notifier)

    def unregister_notifier(self, notifier: Notifier):
        self.notifiers.remove(notifier)


notification_dispatcher = NotificationDispatcher()
