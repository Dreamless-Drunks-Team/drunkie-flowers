import { NavLink } from 'react-router-dom';
import logo from '../../assert/img/flower-logo.png';
import './Header.scss';
import * as React from "react";

function Header() {
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
        <NavLink className="login-button" to="/login"> Увійти </NavLink>
      </header>
  );
}

export default Header;