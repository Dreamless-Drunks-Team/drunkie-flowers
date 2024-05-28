import './BouquetItem.scss'

const BouquetItem = ({ image, name, price }) => {
    return (
      <div className="bouquet-item">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Ціна: ${price}</p>
        <button>Додати до кошика</button>
      </div>
    );
  };
  
  export default BouquetItem;