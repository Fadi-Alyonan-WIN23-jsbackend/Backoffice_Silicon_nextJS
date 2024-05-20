"use client"

import { useState } from "react";
import style from './hamburgerMenu.module.css'

const HamburgerMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return (
      <>
        <div className={`${style.iconContainer} ${menuOpen ? style.change : ''}`} onClick={toggleMenu}>
          <div className={`${style.bar} ${style.bar1}`}></div>
          <div className={`${style.bar} ${style.bar2}`}></div>
          <div className={`${style.bar} ${style.bar3}`}></div>
        </div>
        <div className={`${style.menu} ${menuOpen ? style.open : ''}`}>
          <a href="#" className={style.menuItem}>Home</a>
          <a href="#" className={style.menuItem}>About</a>
          <a href="#" className={style.menuItem}>Services</a>
          <a href="#" className={style.menuItem}>Contact</a>
        </div>
      </>
    );
  };

export default HamburgerMenu;