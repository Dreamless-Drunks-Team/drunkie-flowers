import {React, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import StorePopup from '../../components/StorePopup/StorePopup';
import './Cart.scss';

function Cart() {
    const cartItems = useSelector(state => state.product.cart);

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const goBack = () => {
        navigate(-1);
    };

    const handleContinue = () => {
        setShowPopup(true); // Show the popup when the "Continue" button is clicked
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Hide the popup when the user closes it
    };
    
    const handleSubmitPopup = (details) => {
        setOrderDetails(details);
        // Handle the order details (e.g., submit the order)
        console.log("Order Details:", details);
        setShowPopup(false); // Close the popup after submitting
      };
    
    const totalPrice = () => {
        return cartItems.reduce((total, item) => total += item.price * item.quantity, 0);
    };

    return (
        <div className="Cart">
            {cartItems.map((item, index) => (
                <CartItem
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
                <button className="continue" onClick={handleContinue}>Continue</button>
            </div>

            <StorePopup
                show={showPopup}
                onClose={handleClosePopup}
                onSubmit={handleSubmitPopup}
            />
        </div>
    );
}

export default Cart;