import React, { useEffect } from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Noty from 'noty';
 

 

import audioNotification from '../src/assets/sound/sp-tune.mp3'

import SocketService from './services/SocketService'
import { StorageService } from './services/StorageService'
import { updateUser, getUser } from '../src/actions/UserActions';
import { saveRoom, loadRoomById } from '../src/actions/RoomActions';

import RoutePage from './RoutePage'
import NavBar from './cmps/NavBar';


const history = createBrowserHistory();

const App = (props) => {
  const loggedinUser = props.user;
  const room = props.room

  const connectSockets = (id) => {   

    if (room && loggedinUser) {
      SocketService.on(`updateRoom ${room._id}`, async ({ updatedRoom, userId }) => {
        console.log('&&&&&UPDATE ROOM INVOKED');
        if (userId !== loggedinUser._id) {
          console.log('&&&&&after condition updatedRoom._id');
          props.loadRoomById({ roomId: updatedRoom._id })
        }
      });
    }
    if (loggedinUser) {
      SocketService.on(`updateUser ${loggedinUser._id}`, (updatedUser) => {
        console.log('TEST',updatedUser);
        // console.log('$$UPDATED USER FROM SOCKET$$', updatedUser);
        // console.log('$$USER$$:', loggedinUser.userName)
        let user = StorageService.load('user')
        console.log('Storage:', user.userName)
        if (loggedinUser._id === user._id) updateUser(updatedUser)
      });
      SocketService.on(`updateUserWithoutAudio ${loggedinUser._id}`, ( updatedUser ) => { props.updateUser(updatedUser) })
    }
  }

  const disconnectSockets = () => {
    console.log('disconnect sockets');
    if (room) SocketService.off(`updateRoom ${room._id}`)
    if(loggedinUser){
      SocketService.off(`updateUser ${loggedinUser._id}`)
      SocketService.off(`updateUserWithoutAudio ${loggedinUser._id}`)
    }
  }

  const updateUser = (updatedUser) => {
    console.log('update that user!');
    let audio = new Audio(audioNotification);
    if (updatedUser) {
      props.updateUser(updatedUser)
      audio.play()
    } else {
      console.log("ERROR IN UPDATE USER");
    }
  }

  const showNotification = (text, type) =>{
    console.log('clciked');
    new Noty({
     text,
     type,
     theme: 'bootstrap-v4',
     layout: 'topRight',
    animation: {
        open: 'animated bounceInRight', // Animate.css class names
        close: 'animated bounceOutRight' // Animate.css class names
    },
    timeout:1500
  }).show();
  }



  useEffect(() => {
    connectSockets()
    if (loggedinUser) console.log('connect user sockets', loggedinUser._id);
    if (room) console.log('connect room sockets', room._id);
    return () =>{
      disconnectSockets()
          if (room) SocketService.off(`updateRoom ${room._id}`)

    }
 
  }, [loggedinUser, room]);

useEffect(() => {
     SocketService.setup()
    

    return () => {
        console.log('disconnecet user sockets', loggedinUser._id);
        if (room) console.log('disconnecet room sockets', room._id);
        disconnectSockets()
        SocketService.terminate()
      
    };
  }, [])


  return (
    <div className="App">
      <Router history={history}>
        <NavBar user={loggedinUser} showNotification={showNotification} />
        <RoutePage onConnectSocket={connectSockets} showNotification={showNotification} />
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
  updateUser,
  saveRoom,
  loadRoomById,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);