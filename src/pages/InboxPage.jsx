import React ,{useEffect} from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../actions/UserActions';

import SocketService from '../services/SocketService'


import NotificationList from '../cmps/Notification/NotificationList';

const InboxPage = (props) => {
  
  const { user } = props

  const onApprove = (notification) => {
    SocketService.emit("approve", { notification,user });

  }
  const onDecline = (notification) => {
    SocketService.emit("decline", { notification, user });
  }

  const onDeleteNotification = (notification) => {
    const idx = user.notifications.findIndex(
      currNotification => currNotification._id === notification._id
    );
    user.notifications.splice(idx, 1);
      props.updateUser(user)
  }



  return (
    (!user) ? <h1>Inbox is empty</h1> :
      <div>
        {user && <div>
          {!!user.notifications.length && <NotificationList notifications={user.notifications} onApprove={onApprove} onDecline={onDecline} onDeleteNotification={onDeleteNotification} ></NotificationList>}
        </div>
        }
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    room: state.room.currRoom,

  };
};

const mapDispatchToProps = {
  updateUser,

};

export default connect(mapStateToProps, mapDispatchToProps)(InboxPage);