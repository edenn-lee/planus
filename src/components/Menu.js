import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu({isOpen, onClose}) {
  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <h2 className='menu-title'>menu</h2>
      
      <nav>
        <ul className='menu-content'>
          <li><NavLink to="/Mycalendar" onClick={onClose}>일정</NavLink></li>
          <li><NavLink to="/group" onClick={onClose}>그룹</NavLink></li>
          <li><NavLink to="/Login" onClick={onClose}>세팅</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;