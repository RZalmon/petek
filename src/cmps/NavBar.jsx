import React ,{useState} from 'react';

// import { NavLink } from 'react-router-dom';

import BurgerMenu from './BurgerMenu';



export default (props) => {

  const { user } = props
  const [isClicked, toggleClick] = useState(false)
  
  const onOpenMenu = (term) =>{
    (!term) ? setTimeout(() => {
      toggleClick(term)
    }, 450) : 
    toggleClick(term)
  }


  return (
     <nav className="NavBar">
       {user && !!user.notifications.length && !isClicked && <span className="notification-count nav-count">{user.notifications.length}</span>}
   <BurgerMenu onOpenMenu={onOpenMenu}  />
    </nav>
  );
};