import { useState, useEffect } from 'react';
import "./BouquetBuilder.scss"

const BouquetBuilder = () => {
  const [packaging, setPackaging] = useState('box');
  const [flower, setFlower] = useState('')
  const [numberOfFlowers, setNumberOfFlowers] = useState(1);
  const [bouquet, setBouquet] = useState([]);
  const [inclideTape, setInclideTape] = useState(false)
  const [colorTape, setColorTape] = useState('#032320')
  const [typeDelivery, setTypeDelivery] = useState('salon')

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

  return (
    <div className='BouquetBuilder'>
      <h1>Створення власного букету</h1>

      <h2>Спосіб упакування</h2>
      <select value={packaging} onChange={(e) => setPackaging(e.target.value)}>
        <option value="box">Коробка</option>
        <option value="color_paper">Кольоровий папір</option>
        <option value="paper">Прозорий папір</option>
      </select>

      <h2>Вибір квітів та їх кількості</h2>
      <input type="text" placeholder="Введіть назву квітки" onChange={e => setFlower(e.target.value)} />
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

      <h2>Спосіб доставки</h2>
      <select value={typeDelivery} onChange={(e) => setTypeDelivery(e.target.value)}>
        <option value="pickup">Самовивіз</option>
        <option value="salon">Салон</option>
        <option value="post_delivery">Пошта</option>
      </select>
    </div>
  );
};

export default BouquetBuilder;

