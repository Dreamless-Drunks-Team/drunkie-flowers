import BouquetItem from '../../components/BouquetItem/BouquetItem';
import './Home.scss';

const Home = ({ bouquetList }) => {
  return (
    <div className="catalog-container">
      <h2>Актуальні пропозиції:</h2>
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

export default Home;
