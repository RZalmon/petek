import React from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../actions/UserActions';

import SocketService from '../services/SocketService'



import NotificationList from '../cmps/Notification/NotificationList';

const InboxPage = (props) => {
  const { user } = props
  console.log('USER', user);

 const onApprove = (notification) =>{
   const _id = user._id;
   spliceNotification(notification); 
   SocketService.emit("approve", {notification, _id});
   
  }
  const onDecline = (notification) =>{
    const _id = user._id;
    spliceNotification(notification);
    SocketService.emit("decline", {notification, _id});
 }

 const spliceNotification = (notification) =>{
  const idx = user.notifications.findIndex(
    currNotification => currNotification._id === notification._id
  );
  user.notifications.splice(idx, 1);
  props.updateUser(user)
 }

 const onDeleteNotification = (notification) =>{
  spliceNotification(notification)   
 }






  return (
    (!user) ?  <h1>balls for you</h1> :
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
  };
};

const mapDispatchToProps = {
  updateUser,

};

export default connect(mapStateToProps, mapDispatchToProps)(InboxPage);