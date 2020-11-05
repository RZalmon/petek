import React ,{useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';


import logo from '../../src/assets/png/petek-logo.png'
import BurgerMenu from './BurgerMenu';



export default (props) => {

  const { user,showNotification } = props
  const [isClicked, toggleClick] = useState(false)
   
  useEffect(() => {
    return () => {
      toggleClick(false)
    };
  }, [isClicked])
  

  return (
     <nav className="main-navbar">
        <Link to={`/`} className="home-link" >
        <img src={logo} alt="logo" className="logo"/>
        </Link>
       {user && !!user.notifications.length && <span className="notification-count nav-count" onClick={() => {toggleClick(true)}} >{user.notifications.length}</span>}
       <BurgerMenu isClicked={isClicked} showNotification={showNotification} />
    </nav>
  );
};


// import React ,{useState ,useEffect} from 'react';
// import { Link } from 'react-router-dom';


// import logo from '../../src/assets/png/petek-logo.png'
// import BurgerMenu from './BurgerMenu';



// export default (props) => {

//   const { user,showNotification } = props
//   const [isClicked, toggleClick] = useState(false)
   
//   useEffect(() => {
//     return () => {
//       toggleClick(false)
//     };
//   }, [isClicked])
  

//   return (
//      <nav className="main-navbar">
//         <Link to={`/`} className="home-link" >
//         <img src={logo} alt="logo" className="logo"/>
//         </Link>
//        {user && !!user.notifications.length && <span className="notification-count nav-count" onClick={() => {toggleClick(true)}} >{user.notifications.length}</span>}
//        <BurgerMenu isClicked={isClicked} showNotification={showNotification} />
//     </nav>
//   );
// };