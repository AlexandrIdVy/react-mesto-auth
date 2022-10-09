import React from 'react';
import { Link } from 'react-router-dom';

function Header({text, userData, loggedIn, path}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <ul className="header__auth-list">
      {loggedIn && <li className="header__auth-item">{userData.email}</li>}
      <li className="header__auth-item"><Link className="link" to={path}>{text}</Link></li>
    </ul>
    </header>
  );
}

export default Header;
