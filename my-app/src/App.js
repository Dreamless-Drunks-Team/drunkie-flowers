import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header"

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
