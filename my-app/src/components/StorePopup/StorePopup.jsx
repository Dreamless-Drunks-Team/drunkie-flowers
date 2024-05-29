import React, { useState } from 'react';
import './StorePopup.scss';

const StorePopup = ({ show, onClose, onSubmit }) => {
  const [store, setStore] = useState('');
  const [delivery, setDelivery] = useState('');
  const [packaging, setPackaging] = useState('');

  const handleSubmit = () => {
    onSubmit({ store, delivery, packaging });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Choose Store and Delivery Options</h2>
        
        <div className="popup-section">
          <label htmlFor="store">Store</label>
          <select id="store" value={store} onChange={(e) => setStore(e.target.value)}>
            <option value="">Select Store</option>
            <option value="store1">Store 1</option>
            <option value="store2">Store 2</option>
            <option value="store3">Store 3</option>
          </select>
        </div>

        <div className="popup-section">
          <label htmlFor="delivery">Delivery</label>
          <select id="delivery" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
            <option value="">Select Delivery</option>
            <option value="pickup">Pickup</option>
            <option value="home">Home Delivery</option>
          </select>
        </div>

        <div className="popup-section">
          <label htmlFor="packaging">Packaging</label>
          <select id="packaging" value={packaging} onChange={(e) => setPackaging(e.target.value)}>
            <option value="">Select Packaging</option>
            <option value="box">Box</option>
            <option value="color_paper">Color Paper</option>
            <option value="transparent_paper">Transparent Paper</option>
          </select>
        </div>

        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default StorePopup;