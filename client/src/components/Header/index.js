import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/android-chrome-192x192.png';
import Auth from '../../utils/auth'

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondaryflex-row align-center">
      <div className="row navbar justify-space-between-lg ">
        <div className='col-6 justify-space-between'>
          <img src={Logo} alt="Connect-4 logo" className='header-img'></img>
          <h1 className='header-title' style={{ display: "inline-block" }}>Connect-4</h1>
        </div>
        <nav className="col-6">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/" className='header-link'>Login</Link>
              <Link to="/signup"className='header-link'>Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;