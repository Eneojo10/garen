import React, { useState } from 'react';
import Left from '../Users/Left';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <button className='hamburger-btn' onClick={toggleMenu}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </button>
      <nav className='menu'>
        <div>
          <Left />
        </div>
      </nav>
    </div>
  );
}

export default HamburgerMenu;
