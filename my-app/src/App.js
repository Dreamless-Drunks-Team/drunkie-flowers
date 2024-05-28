import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginForm from "./page/Login/LoginForm";
import RegistrationForm from "./page/Registration/RegistrationForm";
import Home from "./page/Home/Home"
import UserProfile from "./page/UserAccount/UserProfile";

const user = {
  firstName: "Pavlo",
  lastName: "Turchynyak",
  email: "pavlo.turchynyak@gmail.com",
  status: "LOL,",
  paymentMethods: ["Lol", "Ce"]
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<UserProfile user={user}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
