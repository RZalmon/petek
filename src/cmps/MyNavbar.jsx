import React, { createRef, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom';

import logo from '../../src/assets/png/petek-logo.png';


export default ({ user, handleLogout, history }) => {
    const checkboxRef = createRef()

    // useEffect(() => {//Closing The menu after click
    //    console.log(history.location);
    //      checkboxRef.current.checked = false;
    // }, [history.location.pathname])

useEffect(() => {
      return history.listen((location) => { 
          console.log(checkboxRef);
        //   if(checkboxRef && checkboxRef.current) checkboxRef.current.checked = false;
         console.log(`You changed the page to: ${location.pathname}`) 
      }) 
   },[history])

    return (
        <nav className="main-nav">
            <div className="nav-container container">

                <Link to={`/`} className="logo-container" >
                    <img src={logo} alt="logo" className="logo" />
                </Link>

                <input type="checkbox" id="mobile-nav" ref={checkboxRef} hidden />
               { user &&<label htmlFor="mobile-nav" className="mobile-btn">
                    <span>|</span>
                </label>}

                {user && <ul className="link-list">
                    <li>
                        <NavLink to="/" className="link" exact>
                            Home
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="link" exact>
                            Contacts
                         </NavLink>
                    </li>
                    <li>
                        {user.notifications.length && <span className="notification-count">{user.notifications.length}</span>}
                        <NavLink to={`/inbox/${user._id}`} className="link" exact>
                            Inbox
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/random-game`} className="link" exact>
                            Random Game
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/starred" className="link" exact>
                            Starred
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" className="link" exact onClick={handleLogout}>
                            Logout
                       </NavLink>
                    </li>
                </ul>
                }
            </div>
        </nav>
    )
}


