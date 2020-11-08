import React, { createRef, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom';

import logo from '../../src/assets/png/petek-logo.png';


export default ({ user, handleLogout }) => {
    const checkboxRef = createRef()

    useEffect(() => {//Closing The menu after click
        if (checkboxRef.current.checked) checkboxRef.current.checked = false;
    }, [checkboxRef])

    return (
        <nav className="main-nav">
            <div className="nav-container container">

                <Link to={`/`} className="logo-container" >
                    <img src={logo} alt="logo" className="logo" />
                </Link>

                <input type="checkbox" id="mobile-nav" ref={checkboxRef} hidden />
                <label for="mobile-nav" class="mobile-btn">
                    <span>|</span>
                </label>

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


