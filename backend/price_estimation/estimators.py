from dis import disco
from observability.log import log
from orm.bouquet import Bouquet, BouquetItem
from orm.price_policy_entity import PricePolicyEntity
from price_estimation.price_decorator import price_policy




@price_policy("Cumulative Price")
def cumullative_bouquet_price_policy(price: float, policy: PricePolicyEntity) -> float:  
    policy_data = policy.policy_details

    if policy_data.get("discount_percent") is None:
        log.error("Discount percent not found in policy")
        return price
          
    discount_percent = policy_data["discount_percent"]
      
    bouquet = Bouquet.query.filter(Bouquet.id == policy.id).first()
    bouquet_items = BouquetItem.query.filter(BouquetItem.bouquet_id == bouquet.id).all()
    
    additional_price = 0
    for item in bouquet_items:
        additional_price += item.flower.price * item.quantity
    
    additional_price *= 1 - discount_percent
    return price + additional_price
    


@price_policy("Additional Cost")
def additional_cost_policy(price: float, policy: PricePolicyEntity) -> float:
    policy_data = policy.policy_details

    if policy_data.get("price") is None:
        log.error("Price not found in policy")
        return price
          
    additional_price = policy_data["price"]    
    return price + additional_price


@price_policy("Premium")
def premium_policy(price: float, policy: PricePolicyEntity) -> float:
    policy_data = policy.policy_details

    if policy_data.get("discount") is None:
        log.error("Discount not found in policy")
        return price
          
    discount = policy_data["discount"]
    return price * (1 - discount)
