import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LoginForm from "./page/Login/LoginForm";
import RegistrationForm from "./page/Registration/RegistrationForm";
import Home from "./page/Home/Home"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
