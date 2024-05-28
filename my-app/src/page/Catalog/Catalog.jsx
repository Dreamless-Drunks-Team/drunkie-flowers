import BouquetItem from '../../components/BouquetItem/BouquetItem';
import './Catalog.scss'

const Catalog = ({ bouquetList }) => {
  return (
    <div className="catalog-page">
      <div className="filters">
        <h3>Фільтри</h3>
        <div className="filter-section">
          <h4>Сезон</h4>
          <ul>
            <li>Зимовий</li>
            <li>Осінній</li>
            <li>Літній</li>
            <li>Весняний</li>
          </ul>
        </div>
        <div className="filter-section">
          <h4>Події</h4>
          <ul>
            <li>Весілля</li>
            <li>Похорони</li>
            <li>Дні народження</li>
            <li>Інші свята</li>
          </ul>
        </div>
        <div className="filter-section">
          <h4>Діапазон ціни</h4>
          <input type="text" placeholder="Від" />
          <input type="text" placeholder="До" />
        </div>
        <div className="filter-section">
          <h4>Букети зі знижкою</h4>
          <input type="checkbox" />
        </div>
      </div>
      <div className="bouquet-list">
        {bouquetList.map((image, index) => (
          <BouquetItem
            key={index}
            image={image}
            name="Назва букету"
            price={50} // Повинні бути реальні дані ціни
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
