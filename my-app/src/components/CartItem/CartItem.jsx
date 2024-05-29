import React from 'react';
import './CartItem.scss';
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../../storage/slice';

function CartItem({ count, id, price, name }) {
    const dispatch = useDispatch()
    return (
        <div className='cart-item'>
            <div className='title'>
                <img src='../../assert/flower/bouquet_1.svg' alt={'Camera'}/>
                <p>TEXT</p>
            </div>
            <p className='name'> {name} </p>
            <div className='count'>
                <span onClick={() => dispatch(incrementQuantity(id))}> + </span>
                <p> { count} </p>
                <span onClick={() => dispatch(decrementQuantity(id))}> - </span>
            </div>
            <span className='price'> {price} $</span>
        </div>
    );
};


export default CartItem;