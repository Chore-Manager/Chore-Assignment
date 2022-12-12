import React from 'react';
import style from './css/navbar.css';
import MainLogo from './MainLogo.png';

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={MainLogo}></img>
    </div>
  );
};

export default NavBar;
