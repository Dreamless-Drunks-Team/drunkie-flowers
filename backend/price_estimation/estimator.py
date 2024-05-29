from orm.order import Order
from orm.order_item import OrderItem
from orm.price_policy_entity import PricePolicyEntity
from price_estimation.price_policy_map import policy_map


class PriceEstimator:
    def get_final_price(price: float, *policies: PricePolicyEntity):

        policies = sorted(policies, key=lambda x: x.policy_type.priority)

        for policy in policies:
            price = policy_map.get_policy(policy.policy_type.name)(price, policy)

        return price
