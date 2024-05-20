"use client"
import HamburgerMenu from '../variousComponents/hamburgerMenu/hamburgerMenu';
import style from './header.module.css'

export default function Header() {
    
    
    return (
      <>
        <div className={`header ${style.header}`}>
            <HamburgerMenu />
        </div>
      </>
    );
  }