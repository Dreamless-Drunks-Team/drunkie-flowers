import React from 'react';
import './Home.scss';

const Home = () => {
  const images = require.context('../../assert/flower/', true);
  const imageList = images.keys().map(image => images(image));

  return (
    <div className="catalog-container">
      <h2>Актуальні пропозиції:</h2>
      <div className="bouquet-list">
        {imageList.map((image, index) => (
          <div key={index} className="bouquet-item">
            <img src={image} alt={`bouquest-${index}`} />
            <h3>Назва букету</h3>
            <p>Ціна: $50</p>
            <button>Додати до кошика</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
