import React from 'react';
import './UserProfile.scss'
const UserProfile = ({ user }) => {
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
        {/* Цей блок можна заповнити замовленнями користувача */}
      </div>
    </div>
  );
};

export default UserProfile;
