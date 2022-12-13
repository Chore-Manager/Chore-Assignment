import React from 'react';
import style from './css/navbar.css';
import logoNoBackground from './logoNoBackground.png';

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={logoNoBackground}></img>
    </div>
  );
};

export default NavBar;
