import { useState, useEffect } from 'react';
import "./BouquetBuilder.scss"
import { useDispatch } from 'react-redux';
import { addToCart } from '../../storage/slice';
import axios from "axios";

const BouquetBuilder = () => {
  const [flower, setFlower] = useState('')
  const [numberOfFlowers, setNumberOfFlowers] = useState(1);
  const [bouquet, setBouquet] = useState([]);
  const [inclideTape, setInclideTape] = useState(false)
  const [colorTape, setColorTape] = useState('#032320')
  const [flowers, setFlowers] = useState([]);

  const handleAddFlower = (e) => {
    setBouquet(prevBouquet => [...prevBouquet, { flower, numberOfFlowers }])
    console.log(bouquet)
  };

  const handleRemoveFlower = (item) => {
    var array = [...bouquet];
    var index = array.indexOf(item)
    if (index !== -1) {
      array.splice(index, 1);
      setBouquet(array);
    }
  }

  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    axios 
        .get("http://localhost:5000/bouquets/flowers") 
        .then((res) => {console.log(res.data); setFlowers(res.data) }) 
        .catch((err) => console.error(err));
  }, []);


  return (
    <div className='BouquetBuilder'>
      <h1>Створення власного букету</h1>

      <h2>Вибір квітів та їх кількості</h2>
      <select onChange={e => setFlower(e.target.value)} value={flower}>
          <option value="" disabled>Виберіть квітку</option>
          {flowers.map((flowerName, index) => (
              <option key={index} value={flowerName}>
                  {flowerName}
              </option>
          ))}
      </select>
      <input type="number" placeholder="Введіть кількість квіток" onChange={e => setNumberOfFlowers(e.target.value)} />
      <button onClick={handleAddFlower}>Додати квітку</button>
      <div className="bouquet-list">
        {bouquet.length > 0 && bouquet.map((item, index) => (
          <div className="bouquet-item" key={index}>
            <div>{item.flower} ({item.numberOfFlowers})</div>
            <div className="close-icon" onClick={() => handleRemoveFlower(item)}>❌</div>
          </div>
        ))}
      </div>

      <h2>Додавання кольорових стрічок</h2>
      <input type="checkbox" checked={inclideTape} onChange={(e) => { setInclideTape(e.target.checked); console.log(e.target.value) }} />
      <input type="color" value={colorTape} onChange={(e) => setColorTape(e.target.value)} />
      <button onClick={() => dispatch(addToCart(
          {
            id: generateUniqueId(),
            name: "Custom bouquet",
            price: 1000,
            thumbnail_url: "http://localhost:5000/files/flower/bouquet_21.jpg"
          }
        ))}>Оформити замовлення</button>
    </div>
  );
};

export default BouquetBuilder;

