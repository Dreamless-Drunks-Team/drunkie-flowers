import { NavLink } from 'react-router-dom';
import logo from '../../assert/img/flower-logo.png';
import './Header.scss';
import { AuthContext } from '../../jwt/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import setMeasurement from '../../storage/slice';

 
function Header() { 
  const { token } = useContext(AuthContext); 
  
 
  useEffect(() => { 
      axios 
              .get("http://localhost:8080/api/measurement/last", { 
              headers: { 
                  Authorization: "Bearer ".concat(token), 
              }, 
          }) 
          .then((res) => setMeasurement(res.data)) 
          .catch((err) => console.error(err)); 
  }, []); 

  return (
      <header className="header">
        <div className="logo-container">
          <img
            loading="lazy"
            src={logo}
            alt="Company Logo"
            className="logo-image"
          />
          <div className="logo-text">
            <div className="logo-main">FLOWER</div>
            <div className="logo-sub">STUDIO</div>
          </div>
        </div>
        <nav className="navbar">
            <ul>
                <li><NavLink to="/"> Головна </NavLink></li>
                <li><NavLink to="/catalog"> Каталог </NavLink></li>
                <li><NavLink to="/custom_bouquets"> Склади Букет </NavLink></li>
                <li><NavLink to="/special_offers"> Спецпропозиції </NavLink></li>
                <li><NavLink to="/cart"> Корзина </NavLink></li>
            </ul>
        </nav>
        {!token && <NavLink className="login-button" to="/login"> Увійти </NavLink> }
        {token && <NavLink className="login-button" to="/profile"> Профіль </NavLink> }
      </header>
  );
}

export default Header;