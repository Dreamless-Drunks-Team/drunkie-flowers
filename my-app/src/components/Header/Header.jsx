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
                <li><NavLink to="/"> Home </NavLink></li>
                <li><NavLink to="/catalog"> Catalog </NavLink></li>
                <li><NavLink to="/cart"> Cart </NavLink></li>
            </ul>
        </nav>
        <NavLink className="login-button" to="/login"> Log in </NavLink>
      </header>
  );
}

export default Header;