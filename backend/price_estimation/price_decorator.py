from typing import Callable
from orm.price_policy_entity import PricePolicyEntity
from price_estimation.price_policy_map import policy_map

def price_policy(policy_name: str):
    def wrapper(func: Callable[[float, PricePolicyEntity], float]):
        policy_map.add_policy(policy_name, func)
        return func
    
    return wrapper