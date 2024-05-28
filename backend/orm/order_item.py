from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from orm.db import db

class OrderItem(db.Model):
    __tablename__ = "order_item"
    id: Mapped[int] = mapped_column(primary_key=True)
    price: Mapped[float]
    bouquet_id: Mapped[int] = mapped_column(ForeignKey("bouquet.id"))
    event_id: Mapped[int] = mapped_column(ForeignKey("event.id"))
    packaging_id: Mapped[int] = mapped_column(ForeignKey("decoration.id"))
    order_id: Mapped[int] = mapped_column(ForeignKey("order.id"))
    
    
    bouquet: Mapped["Bouquet"] = db.relationship()
    event: Mapped["Event"] = db.relationship()
    packaging: Mapped["Decoration"] = db.relationship()
    order: Mapped["Order"] = db.relationship()

    