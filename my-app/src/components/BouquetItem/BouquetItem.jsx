import './BouquetItem.scss'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../storage/slice';
import axios from 'axios';
import StorePopup from '../StorePopup/StorePopup';

const BouquetItem = ({ id, image, name, price }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.product.cart);
    
    const [showPopup, setShowPopup] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const createEmptyCart = async () => {
      try {
        const response = await axios.post('http://localhost:5000/orders/create_order', {}, {
          headers: {
            'Content-Type': 'application/json',
            // Add any required headers, such as Authorization, if needed
          }
        });
        
        console.log('Empty cart created:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating an empty cart:', error);
      }
    };

    const postCartItemToCart = async (cartId) => {
      handlePackaging();
      try {
        const response = await axios.post(`http://localhost:5000/order/${cartId}/items`, {
          id: id,
          name: name,
          price: price,
          thumbnail_url: image,
          packaging: orderDetails.packaging,
          delivery: orderDetails.delivery
        }, {
          headers: {
            'Content-Type': 'application/json',
            // Add any required headers, such as Authorization, if needed
          }
        });
        console.log('CartItem added to cart:', response.data);
      } catch (error) {
        console.error('Error posting cartItem to cart:', error);
      }
    };
    
    const handlePackaging = () => {
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
  

    const handleAddToCart = async () => {
      try {
        // Create an empty cart if the cart is empty
        if (cartItems.length === 0) {
          const newCart = await createEmptyCart();
          if (newCart) {
            // Add the item to the newly created cart
            await postCartItemToCart(newCart.id);
          }
        } else {
          // Add the item to the existing cart
          await postCartItemToCart(cartItems[0].id);
        }
        
        // Now add the item to the Redux cart
        dispatch(addToCart({
          id: id,
          name: name,
          price: price,
          thumbnail_url: image
        }));

      } catch (error) {
        console.error('Error handling add to cart:', error);
      }
    };

    
    return (
      <div className="bouquet-item">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Ціна: ${price}</p>
        <button onClick={() => {handleAddToCart()}
        }>Додати до кошика</button>
        <StorePopup
            show={showPopup}
            onClose={handleClosePopup}
            onSubmit={handleSubmitPopup}
        />
      </div>
    );
  };
  
  export default BouquetItem;