



from orm.order_item import OrderItem
from orm.order import Order
from events.observable import Observable


on_order_checkout = Observable[Order]()
on_order_item_added = Observable[OrderItem]()
on_login = Observable[str]()
on_account_change = Observable[str]()