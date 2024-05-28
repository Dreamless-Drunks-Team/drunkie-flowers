import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginForm from "./page/Login/LoginForm";
import RegistrationForm from "./page/Registration/RegistrationForm";
import Home from "./page/Home/Home"
import UserProfile from "./page/UserAccount/UserProfile";
import Catalog from "./page/Catalog/Catalog";

const user = {
  firstName: "Pavlo",
  lastName: "Turchynyak",
  email: "pavlo.turchynyak@gmail.com",
  status: "LOL,",
  paymentMethods: ["Lol", "Ce"],
  history_of_orders: [
    {
      date: "2021-10-10",
      status: "Delivered",
      order: [
        {
          name: "Bouquet1",
          price: 1000,
          quantity: 1,
          image: 'https://img.freepik.com/free-photo/view-flowers-transparent-glass-with-water-drops_23-2149478590.jpg?t=st=1716916200~exp=1716919800~hmac=5c2c17ed4c1702a0f4b2cd4f4a87cef19bb79057f8d0c3dad7d8269fc1a0655d&w=740'
        },
        {
          name: "Bouquet2",
          price: 100,
          quantity: 2,
          image: 'https://img.freepik.com/free-photo/view-flowers-transparent-glass-with-water-drops_23-2149478590.jpg?t=st=1716916200~exp=1716919800~hmac=5c2c17ed4c1702a0f4b2cd4f4a87cef19bb79057f8d0c3dad7d8269fc1a0655d&w=740'
        },
      ],
    },
    {
      date: "2021-10-11",
      status: "Delivered",
      order: [
        {
          name: "Bouquet3",
          price: 200,
          quantity: 1,
          image: 'https://img.freepik.com/free-photo/view-flowers-transparent-glass-with-water-drops_23-2149478590.jpg?t=st=1716916200~exp=1716919800~hmac=5c2c17ed4c1702a0f4b2cd4f4a87cef19bb79057f8d0c3dad7d8269fc1a0655d&w=740'
        },
        {
          name: "Bouquet4",
          price: 300,
          quantity: 1,
          image: 'https://img.freepik.com/free-photo/view-flowers-transparent-glass-with-water-drops_23-2149478590.jpg?t=st=1716916200~exp=1716919800~hmac=5c2c17ed4c1702a0f4b2cd4f4a87cef19bb79057f8d0c3dad7d8269fc1a0655d&w=740'
        },
      ],
    },
  ],
}

const images = require.context('./assert/flower/', true);
const bouquetList = images.keys().map(image => images(image));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home bouquetList={bouquetList.slice(0, 5)}/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/catalog" element={<Catalog bouquetList={bouquetList}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
