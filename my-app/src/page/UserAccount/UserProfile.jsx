import React, { useState } from 'react';
import './UserProfile.scss'; // Regular SCSS import

const UserProfile = ({ user }) => {
  const [showDetails, setShowDetails] = useState(user.history_of_orders.map(() => false));

const toggleDetails = index => {
  const updatedShowDetails = [...showDetails];
  updatedShowDetails[index] = !updatedShowDetails[index];
  setShowDetails(updatedShowDetails);
};

  return (
    <div className="user-profile">
      <h2>Інформація про користувача</h2>
      <div>
        <p><strong>Ім'я:</strong> {user.firstName}</p>
        <p><strong>Прізвище:</strong> {user.lastName}</p>
        <p><strong>Пошта:</strong> {user.email}</p>
        <p><strong>Статус:</strong> {user.status}</p>
        <p><strong>Способи оплати:</strong> {user.paymentMethods.join(', ')}</p>
      </div>
      <h2>Історія замовлень</h2>
      <div>
        {user.history_of_orders.map((orderHistory, index) => (
          <div key={index} className="order-history">
            <p><strong>Дата оформлення замовлення:</strong> {orderHistory.date}</p>
            <p><strong>Статус:</strong> {orderHistory.status}</p>
            <button onClick={() => toggleDetails(index)}>
              {showDetails[index] ? 'Приховати деталі' : 'Показати деталі'}
            </button>
            {showDetails[index] && (
              <ul>
                {orderHistory.order.map((orderItem, idx) => (
                  <li key={idx} className="order-item">
                    <div className="order-info">
                      <p><strong>Назва:</strong> {orderItem.name}</p>
                      <p><strong>Ціна:</strong> {orderItem.price} грн</p>
                      <p><strong>Кількість:</strong> {orderItem.quantity}</p>
                    </div>
                    {orderItem.image && (
                      <div className="order-image">
                        <img src={orderItem.image} alt={`bouquet-${index}`} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
