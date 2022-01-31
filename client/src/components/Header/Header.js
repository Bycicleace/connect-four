import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/android-chrome-192x192.png";
import Auth from "../../utils/auth";
import "./Header.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header__container">
        <Link to="/" className="header__banner">
          <img src={Logo} alt="Connect-4 logo" className="header__img"></img>
          <p className="header__title">Connect-4</p>
        </Link>
      <nav className="header__nav">
        <Link to="/" className="header__link">
          LOGIN
        </Link>
        <Link to="/signup" className="header__link">
          SIGNUP
        </Link>
      </nav>
    </header>
  );
};

export default Header;
