import './BouquetItem.scss'
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../storage/slice';
import axios from 'axios';
import StorePopup from '../StorePopup/StorePopup';
import { AuthContext } from '../../jwt/AuthContext';

const BouquetItem = ({ id, image }) => {
  const { token } = useContext(AuthContext);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.product.cart);

  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [name, setName] = useState("")
  const [price, setPrice] = useState(100)
  const [flowerId, setFlowerId] = useState([])
  const [quantityFlower, setQuantityFlower] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bouquets/${id}`)
      .then((res) => {
        setName(res.data.name);
        setFlowerId(res.data.flowers)
      })
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:5000/bouquets/${id}/items`)
      .then((res) => {
        setQuantityFlower(res.data.map((el) => el.quantity))
      })
      .catch((err) => console.error(err));
    
    if (flowerId.length > 0 && quantityFlower.length > 0)
      for (let flower of flowerId) {
        for (let property of quantityFlower) {
          if (flower.id == property.flower_id) {
            price += property.quantity * flower.price
          }
        }
      }

    if (price !== undefined) {
      setPrice(price)
    } else {
      setPrice(100)
    }
  }, [])

  const createEmptyCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/orders/create_order', {}, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer ".concat(token)
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
          "Authorization": "Bearer ".concat(token)
        }
      });
      console.log('CartItem added to cart:', response.data);
    } catch (error) {
      console.error('Error posting cartItem to cart:', error);
    }
  };

  const handlePackaging = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmitPopup = (details) => {
    setOrderDetails(details);
    console.log("Order Details:", details);
    setShowPopup(false); // Close the popup after submitting
  };


  const handleAddToCart = async () => {
    try {
      if (cartItems.length === 0) {
        const newCart = await createEmptyCart();
        if (newCart) {
          await postCartItemToCart(newCart.id);
        }
      } else {
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
      <button onClick={() => { handleAddToCart() }
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