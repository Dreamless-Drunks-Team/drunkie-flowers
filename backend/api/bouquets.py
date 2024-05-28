from dataclasses import dataclass
import json
from typing import List
from flask import Blueprint, request

@dataclass
class Filter:
    prompt: str
    events: List[int]
    packages: List[int]
    delivery: List[int]
    
    
bouquets = Blueprint('bouquets', __name__)

@bouquets.route('/')
def get_items():
    print(request.args.to_dict())    
    

@bouquets.route('/<int:id>')
def get_item(id: int):
    # Retrieve and return bouquet with id
    pass

@bouquets.route('/', methods=['POST'])
def add_item():
    # Add a new bouquet
    pass

@bouquets.route('/<int:id>', methods=['DELETE'])
def delete_item(id: int):
    # Delete bouquet with id
    pass
