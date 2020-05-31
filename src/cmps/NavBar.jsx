import React from 'react';
import { NavLink } from 'react-router-dom';

import BurgerMenu from './BurgerMenu';



export default (props) => {
  return (
    <nav className="NavBar">
   <BurgerMenu/>
    </nav>
  );
};