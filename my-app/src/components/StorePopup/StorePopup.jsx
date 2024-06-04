import React, { useState } from 'react';
import './StorePopup.scss';

const StorePopup = ({ show, onClose, onSubmit }) => {
  const [delivery, setDelivery] = useState('');
  const [packaging, setPackaging] = useState('');

  const handleSubmit = () => {
    onSubmit({ delivery, packaging });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Вибирайте упакування та способи доставки</h2>

        <div className="popup-section">
          <label htmlFor="delivery">Доставка</label>
          <select id="delivery" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
            <option value="">Вибрати доставку</option>
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