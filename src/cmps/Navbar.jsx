import React, { createRef, useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { Link, NavLink, withRouter } from 'react-router-dom';

import logo from '../../src/assets/png/petek-logo.png';

import NotificationIcon from './icons/NotificationIcon';

import InboxPage from '../pages/InboxPage';

import { setFilterBy, resetFilterBy, loadContacts } from '../actions/ContactActions';



const Navbar = ({ user, handleLogout, history, setFilterBy, resetFilterBy, loadContacts, contacts, filterBy }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const checkboxRef = createRef()

    const handleCheboxClicked = (bool) => {
        setIsMenuOpen(bool)
        if (checkboxRef.current) checkboxRef.current.checked = bool
    }


    return (
        <nav className="main-nav">
            <div className="nav-container">
                <Link to={`/`} className="logo-container" >
                    <img src={logo} alt="logo" className="logo" />
                </Link>

                {(!isMenuOpen && user && user.notifications.length) && <span className="notification-count-nav">{user.notifications.length}</span>}
                <input type="checkbox" id="mobile-nav" className={isMenuOpen ? 'menu-open' : ''} ref={checkboxRef} hidden onClick={() => handleCheboxClicked(!isMenuOpen)} />
                {user && <label htmlFor="mobile-nav" className="mobile-btn">
                    <span>|</span>
                </label>}

                {user && <ul className="link-list">
                    <li>
                        <NavLink to="/" className="link" exact onClick={() => handleCheboxClicked(false)}>
                            Home
                         </NavLink>
                    </li>
                    <li>
                        {user.notifications.length && <span className="notification-count">{user.notifications.length}</span>}
                        <div className='notification-list-container'>
                            <i className='notificaion-icon' onClick={() => setIsNotificationOpen(!isNotificationOpen)}><NotificationIcon /></i>
                            {isNotificationOpen && <i className='notification-list'><InboxPage /></i>}
                        </div>
                        <NavLink to={`/inbox/${user._id}`} className="link link-inbox" exact onClick={() => { handleCheboxClicked(false) }}>
                            Inbox
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/random-game`} className="link" exact onClick={() => handleCheboxClicked(false)}>
                            Random Game
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/room/${user._id}`} className="link" exact onClick={() => handleCheboxClicked(false)}>
                            Private
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/starred" className="link" exact onClick={() => handleCheboxClicked(false)}>
                            Starred
                         </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="link" exact onClick={() => handleCheboxClicked(false)}>
                            Contacts
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
const mapStateToProps = (state) => {
    return {
        filterBy: state.contact.filterBy,
        contacts: state.contact.contacts,
    };
};
const mapDispatchToProps = {
    setFilterBy,
    resetFilterBy,
    loadContacts
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);










// import React, { createRef, useEffect, useState } from 'react'
// import { Link, NavLink, withRouter } from 'react-router-dom';

// import logo from '../../src/assets/png/petek-logo.png';


// export default ({ user, handleLogout, history }) => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     const checkboxRef = createRef()

//     const handleCheboxClicked = (bool) => {
//         setIsMenuOpen(bool)
//         if (checkboxRef.current) checkboxRef.current.checked = bool
//     }


//     return (
//         <nav className="main-nav">
//             <div className="nav-container">
//                 <Link to={`/`} className="logo-container" >
//                     <img src={logo} alt="logo" className="logo" />
//                 </Link>

//                 {(!isMenuOpen && user && user.notifications.length) && <span className="notification-count-nav">{user.notifications.length}</span>}
//                 <input type="checkbox" id="mobile-nav" className={isMenuOpen ? 'menu-open' : ''} ref={checkboxRef} hidden onClick={() => handleCheboxClicked(!isMenuOpen)} />
//                 {user && <label htmlFor="mobile-nav" className="mobile-btn">
//                     <span>|</span>
//                 </label>}

//                 {user && <ul className="link-list">
//                     <li>
//                         <NavLink to="/" className="link" exact onClick={() => handleCheboxClicked(false)}>
//                             Home
//                          </NavLink>
//                     </li>
//                     <li>
//                         {user.notifications.length && <span className="notification-count">{user.notifications.length}</span>}
//                         <NavLink to={`/inbox/${user._id}`} className="link" exact onClick={() => { handleCheboxClicked(false) }}>
//                             Inbox
//                          </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to={`/random-game`} className="link" exact onClick={() => handleCheboxClicked(false)}>
//                             Random Game
//                          </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/starred" className="link" exact onClick={() => handleCheboxClicked(false)}>
//                             Starred
//                          </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/contact" className="link" exact onClick={() => handleCheboxClicked(false)}>
//                             Contacts
//                          </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/signup" className="link" exact onClick={handleLogout}>
//                             Logout
//                        </NavLink>
//                     </li>
//                 </ul>
//                 }
//             </div>
//         </nav>
//     )
// }


