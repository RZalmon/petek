import React from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../actions/UserActions';


import NotificationList from '../cmps/Notification/NotificationList';

const InboxPage = (props) => {
  const { user } = props
  console.log('USER', user);

 const onApprove = (notification) =>{
  spliceNotification(notification);
}
const onDecline = (notification) =>{
  spliceNotification(notification);
 }

 const spliceNotification = (notification) =>{
  const idx = user.notifications.findIndex(
    currNotification => currNotification._id === notification._id
  );
  user.notifications.splice(idx, 1);
  props.updateUser(JSON.parse(JSON.stringify(user)))
  
 }
  return (
    <div>
      {user && <div>
        {!!user.notifications.length && <NotificationList notifications={user.notifications} onApprove={onApprove} onDecline={onDecline} ></NotificationList>}
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