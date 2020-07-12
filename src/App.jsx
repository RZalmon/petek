import React, { useEffect } from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import audioNotification from '../src/assets/sound/sp-tune.mp3'

import SocketService from './services/SocketService'
import { updateUser, getUser } from '../src/actions/UserActions';
import { saveRoom, loadRoomById } from '../src/actions/RoomActions';



import RoutePage from './RoutePage'
import NavBar from './cmps/NavBar';


const history = createBrowserHistory();

const App = (props) => {
  console.log( props.room);
  

  const loggedinUser = props.user;
  const room = props.room
  // const loggedinUser = useSelector((state) => state.user.loggedinUser) ***we should study why bar suggested it

  const connectSockets = () => {
    SocketService.setup()
    if (room && loggedinUser) {      
      SocketService.on(`updateRoom ${props.room._id}`,({ updatedRoom, userId}) => {
        
        console.log(updatedRoom);
        if (loggedinUser._id !== userId) {
          console.log('balls');
          props.loadRoomById({ roomId: updatedRoom._id })
        }
      });
    }
    if (loggedinUser) {
      SocketService.on(`updateUser ${loggedinUser._id}`, (updatedUser) => {
        updateUser(updatedUser)
      });
      SocketService.on(`updateUserWithoutAudio ${loggedinUser._id}`, ({ user }) => { props.updateUser(user) })
    }
  }

  const disconnectSockets = () => {
    if (room) SocketService.off(`updateRoom ${room._id}`)
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
   if(loggedinUser) console.log('connect user sockets',loggedinUser._id);
   if(room) console.log('connect room sockets',room._id);
   return () => {
     if(loggedinUser){
       console.log('disconnecet user sockets', loggedinUser._id);  
       if(room) console.log('disconnecet room sockets',room._id);
        disconnectSockets()
        SocketService.terminate()
      }
    };
  },[loggedinUser, room]);



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
  updateUser,
  saveRoom,
  loadRoomById,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);