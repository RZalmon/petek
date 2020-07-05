import React, { useEffect } from 'react';
import './App.scss';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import audioNotification from '../src/assets/sound/sp-tune.mp3'

import SocketService from './services/SocketService'
import { updateUser } from '../src/actions/UserActions';
import { saveRoom, loadRoomById } from '../src/actions/RoomActions';



import RoutePage from './RoutePage'
import NavBar from './cmps/NavBar';


const history = createBrowserHistory();

const App = (props) => {

  const loggedinUser = props.user;
  const room = props.room
  // const loggedinUser = useSelector((state) => state.user.loggedinUser) ***we should study why bar suggested it

  const connectSockets = (id) => {
    SocketService.setup()
    if (room && loggedinUser) {
      SocketService.on(`updateRoom ${room._id}`, async ({ updatedRoom, userId }) => {
        if (userId !== loggedinUser._id) {
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
    return () => {
      if (loggedinUser) {
        disconnectSockets()
      }
    };
  }, []);


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
  loadRoomById
};

export default connect(mapStateToProps, mapDispatchToProps)(App);