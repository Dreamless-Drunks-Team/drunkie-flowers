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
      order: [
        {
          name: "Bouquet1",
          price: 1000,
          quantity: 1,
          status: "Delivered",
        },
        {
          name: "Bouquet2",
          price: 100,
          quantity: 2,
          status: "Delivered",
        },
      ],
    },
    {
      date: "2021-10-11",
      order: [
        {
          name: "Bouquet3",
          price: 200,
          quantity: 1,
          status: "Delivered",
        },
        {
          name: "Bouquet4",
          price: 300,
          quantity: 1,
          status: "Delivered",
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
