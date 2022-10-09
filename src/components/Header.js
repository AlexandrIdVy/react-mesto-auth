import React from 'react';
import { Link } from 'react-router-dom';

function Header({text, userData, loggedIn, path}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <ul class="header__auth">
      <li><span className={`header__email ${loggedIn ? "header__email_visible" : ""}`}>{userData.email}</span></li>
      <li><Link className="link" to={path}>{text}</Link></li>
    </ul>
    </header>
  );
}

export default Header;
