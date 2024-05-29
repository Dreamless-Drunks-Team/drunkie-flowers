import enum
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db


    
class OrderStatus(enum.Enum):
    CREATED = "created"
    PAID = "paid"
    DELIVERED = "delivered"
    CANCELED = "canceled"

class Order(db.Model):
    __tablename__ = "order"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    card_id: Mapped[int] = mapped_column(ForeignKey("card.id"))
    status: Mapped[OrderStatus] = mapped_column()
    delivery_id: Mapped[int] = mapped_column(ForeignKey("delivery_option.id"))
    
    user: Mapped["User"] = db.relationship()
    card: Mapped["Card"] = db.relationship()

    delivery: Mapped["DeliveryOption"] = db.relationship()
    items: Mapped["OrderItem"] = db.relationship(back_populates="order")

