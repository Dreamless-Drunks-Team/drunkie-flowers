from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db


class User(db.Model):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    email: Mapped[str]
    password: Mapped[str]
    phone: Mapped[str]
    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"))
        
    role: Mapped["Role"] = db.relationship()

class Role(db.Model):
    __tablename__ = "role"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
