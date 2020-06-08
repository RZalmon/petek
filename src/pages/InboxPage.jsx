import React from 'react';
import { connect } from 'react-redux';

import NotificationList from '../cmps/Notification/NotificationList';

const InboxPage = (props) => {
  const { user } = props
  console.log('USER', user);

  return (
    <div>
      {user && <div>
        {!!user.notifications.length && <NotificationList notifications={user.notifications}></NotificationList>}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxPage);