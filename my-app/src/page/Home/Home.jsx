import BouquetItem from '../../components/BouquetItem/BouquetItem';
import './Home.scss';

const Home = ({ bouquetList }) => {
  return (
    <div className="catalog-container">
      <h2>Актуальні пропозиції:</h2>
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

export default Home;
