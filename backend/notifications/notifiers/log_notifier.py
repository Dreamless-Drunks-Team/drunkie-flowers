from orm.user import User
from observability.log import log
from notifications.notifiers.notifier import Notifier


class LogNotifier(Notifier):
    def send(self, recipient: User, message: str):
        log.info(f" - LogNotifier - {message}")
