import './BouquetItem.scss'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../storage/slice';

const BouquetItem = ({ id, image, name, price }) => {
    const dispatch = useDispatch();
    
    return (
      <div className="bouquet-item">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>Ціна: ${price}</p>
        <button onClick={() => dispatch(addToCart(
          {
            id: id,
            name: name,
            price: price,
            thumbnail_url: image
          }
        ))}>Додати до кошика</button>
      </div>
    );
  };
  
  export default BouquetItem;