import React, { useEffect } from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import audioNotification from '../src/assets/sound/sp-tune.mp3'

import SocketService from './services/SocketService'
import { updateUser } from '../src/actions/UserActions';
import { saveRoom, loadRoomById } from '../src/actions/RoomActions';
// import { getUser } from '../src/actions/UserActions';



import RoutePage from './RoutePage'
import NavBar from './cmps/NavBar';


const history = createBrowserHistory();

const App = (props) => {  
 
  const loggedinUser = props.user;
  const room = props.room

  const connectSockets = (id) => {
    SocketService.setup()
    if (room && loggedinUser) {
      SocketService.on(`updateRoom ${room._id}`, async ({ updatedRoom, userId }) => {
        console.log('here?');

        // let newRoom = await props.saveRoom(updatedRoom)        
        if (userId !== loggedinUser._id) {
          console.log('updated that shit', updatedRoom);

          props.loadRoomById({ roomId: updatedRoom._id })
        }

      });
    }
    if(loggedinUser) { 
      console.log(loggedinUser._id);
      
      SocketService.on(`updateUser ${loggedinUser._id}`, (updatedUser) =>{
        console.log(updatedUser);
        
        updateUser(updatedUser)
      });
      SocketService.on(`updateUserWithoutAudio ${loggedinUser._id}`, ({ user }) => {props.updateUser(user)})
    }
  }
  
  const disconnectSockets = () =>{
   if(room) SocketService.off(`updateRoom ${room._id}`)
    SocketService.off(`updateUser ${loggedinUser._id}`)
    SocketService.off(`updateUserWithoutAudio ${loggedinUser._id}`)
  }
  
  const updateUser = (updatedUser) => {    
    let audio = new Audio(audioNotification);
    if (updatedUser) {
      props.updateUser(updatedUser)
      audio.play()
      

    } else {
      console.log("ERROR IN UPDATE USER");
    }
  }


  useEffect(() => {
    connectSockets()
    console.log('connect sockets',loggedinUser);
    return () => {
      if(loggedinUser){
        console.log('disconnecet sockets', loggedinUser);  
        disconnectSockets()
      }
    };

  },[]);


  return (
    <div className="App">
      <Router history={history}>
        <NavBar user={props.user} />
        <RoutePage onConnectSocket={connectSockets} />
      </Router>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    contacts: state.contact.contacts,
    room: state.room.currRoom
  };
};

const mapDispatchToProps = {
  // getUser,
  updateUser,
  saveRoom,
  loadRoomById,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);