from typing import Callable
from orm.price_policy_entity import PricePolicyEntity


class PolicyMap:
    def __init__(self) -> None:
        self.__policy_map: dict[str, Callable[[float, PricePolicyEntity], float]] = {}

    def add_policy(
        self, policy_name: str, policy: Callable[[float, PricePolicyEntity], float]
    ):
        self.__policy_map[policy_name] = policy

    def get_policy(
        self, policy_name: str
    ) -> Callable[[float, PricePolicyEntity], float]:
        policy = self.__policy_map.get(policy_name)

        if policy is None:
            log.error(f"Policy {policy_name} not found")
            return lambda price, policy: price

        return self.__policy_map[policy_name]


policy_map = PolicyMap()
from price_estimation.estimators import *
