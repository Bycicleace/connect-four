import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    // Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container navbar justify-space-between-lg ">
        <div className='container'>
        <img src='../../assets/android-chrome-192x192.png' alt="Connect-4 logo" className='header-img'>
        </img><p className='header-title align-middle '>Connect-4</p>
        </div>
        <nav className="text-center justify-space-between-lg">
          {/* {Auth.loggedIn() ? ( */}(
          <>
            <Link to="/profile">Me</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
          ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
          ){/* )} */}
        </nav>
      </div>
    </header>
  );
};

export default Header;