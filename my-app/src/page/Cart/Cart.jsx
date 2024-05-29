import {React} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import './Cart.scss';

function Cart() {
    const cartItems = useSelector(state => state.product.cart);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    const totalPrice = () => {
        return cartItems.reduce((total, item) => total += item.price * item.quantity, 0);
    };

    return (
        <div className="Cart">
            {cartItems.map((item, index) => (
                <CartItem on
                    key={index}
                    count={item.quantity}
                    id={item.id}
                    image={item.thumbnail_url}
                    price={item.price}
                    name={item.name} />
            ))}
            <p className="total-price">Total price: {totalPrice()} $</p>
            <div className="button">
                <button className="back" onClick={goBack}>Back to Catalog</button>
                <button className="continue">Continue</button>
            </div>
        </div>
    );
}

export default Cart;