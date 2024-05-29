from dataclasses import dataclass
from datetime import datetime, timedelta
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)

from orm.user import User


TOKEN_EXPIRY = timedelta(hours=1)


@dataclass
class TokenPayload:
    def __init__(self, user_id: int, issued_at: datetime):
        self.user_id = user_id
        self.issued_at = issued_at

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "issued_at": self.issued_at,
        }


class AuthManager:
    def __init__(self):
        self.initial_date = datetime.now()
        self.revoked_tokens = {}
        self.revoked_token_lifetime_queue = []

    def authenticate(self, email: str, password: str) -> User:
        user = User.query.filter_by(email=email, password=password).first()
        return user

    def issue_token(self, user: User) -> TokenPayload:
        user_id = user.id
        issued_at = datetime.now()
        return TokenPayload(user_id=user_id, issued_at=issued_at)

    def revoke_token(self, user: User):
        self.revoked_tokens[user.id] = datetime.now()
        self.revoked_token_lifetime_queue.append(user.id)

    def validate_token(self, identity) -> bool:
        self.__clean_expired_revoked_tokens()
        token = TokenPayload(**identity)

        initial_date = self.initial_date
        if token.user_id in self.revoked_tokens:
            initial_date = self.revoked_tokens[token.user_id]

        return (
            token.issued_at > initial_date
            and (token.issued_at + TOKEN_EXPIRY) > datetime.now()
        )

    def __clean_expired_revoked_tokens(self):
        now = datetime.now()

        to_remove = 0
        for user_id in self.revoked_token_lifetime_queue:
            revoked_at = self.revoked_tokens[user_id]
            if revoked_at + TOKEN_EXPIRY > now:
                break
            self.revoked_tokens.pop(user_id)
            to_remove += 1

        self.revoked_token_lifetime_queue = self.revoked_token_lifetime_queue[
            to_remove:
        ]


auth = AuthManager()
