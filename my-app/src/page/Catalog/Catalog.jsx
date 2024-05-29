import BouquetItem from '../../components/BouquetItem/BouquetItem';
import './Catalog.scss';

const Catalog = ({ bouquetList }) => {
  return (
    <div className="catalog-page">
      <div className="filters">
        <h3>Фільтри</h3>
        <div className="filter-section">
          <h4>Сезон</h4>
          <ul>
            <li><input type="checkbox" id="winter" /><label for="winter">Зимовий</label></li>
            <li><input type="checkbox" id="spring" /><label for="spring">Весняний</label></li>
            <li><input type="checkbox" id="summer" /><label for="summer">Літній</label></li>
            <li><input type="checkbox" id="autumn" /><label for="autumn">Осінній</label></li>
          </ul>
        </div>
        <div className="filter-section">
          <h4>Події</h4>
          <ul>
            <li><input type="checkbox" id="wedding" /><label for="wedding">Весілля</label></li>
            <li><input type="checkbox" id="funeral" /><label for="funeral">Похорони</label></li>
            <li><input type="checkbox" id="birthday" /><label for="birthday">Дні народження</label></li>
            <li><input type="checkbox" id="other" /><label for="other">Інші свята</label></li>
          </ul>
        </div>
        <div className="filter-section">
          <h4>Букети зі знижкою</h4>
          <ul>
            <li><input type="checkbox" id="discount" /><label for="discount">Зі знижкою</label></li>
            <li><input type="checkbox" id="noDiscount" /><label for="noDiscount">Без знижки</label></li>
          </ul>
        </div>
        <div className="filter-section">
          <h4>Діапазон ціни</h4>
          <input type="number" placeholder="Від" />
          <input type="number" placeholder="До" />
        </div>
      </div>
      <div className="bouquet-list">
        {bouquetList.map((bouquet, index) => (
          <BouquetItem
            key={index}
            id={bouquet.id}
            image={bouquet.thumbnail_url}
            name={bouquet.name}
            price={50} // Повинні бути реальні дані ціни
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
