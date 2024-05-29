from orm.user import User


class Notifier:
    def send(self, recipient: User, message: str):
        raise NotImplementedError()
