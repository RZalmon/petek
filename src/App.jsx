import React, {useEffect} from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import audioNotification from '../src/assets/sound/notification.mp3'

import SocketService from './services/SocketService'
import { updateUser } from '../src/actions/UserActions';



import RoutePage from './RoutePage'
import NavBar from './cmps/NavBar';


const history = createBrowserHistory();

 const App = (props) => {

  const connectSockets = (id) => {
    SocketService.setup()
    const user = props.user;
    if (!user) return;
    SocketService.on(`updateUser ${user._id}`, updateUser);
  }

  const updateUser = (updatedUser) => {
    let audio = new Audio(audioNotification);    
   if (updatedUser) {
     props.updateUser(updatedUser)
     audio.play()
     // this.audioNotification.play();
     console.log('updated user', props);
     
   } else {
     console.log("ERROR IN UPDATE USER");
   }
 }
 

  useEffect(() => {
    SocketService.setup()

    // Update the document title using the browser API
  });
  return (
    <div className="App">
      <Router history={history}>
         <NavBar/>
            <RoutePage onConnectSocket={connectSockets}/>
          </Router>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    contacts: state.contact.contacts,
  };
};

const mapDispatchToProps = {
  // getUser,
  updateUser,
  // loadContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
