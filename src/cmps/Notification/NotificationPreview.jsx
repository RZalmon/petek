import React from 'react'
import NotificationFriend from './NotificationFriend'
import NotificationResponse from './NotificationResponse'
import NotificationNote from './NotificationNote'
import Moment from 'react-moment';

import xMark from '../../assets/svg/x-mark.svg'



export default ({ notification,onApprove, onDecline, onDeleteNotification }) => {
    const cmps = {
        NotificationFriend,
        NotificationResponse,
        NotificationNote
    }
  

    const NotificationType = cmps[notification.type];
    return (
        <div className="notification-preview">
            <div className="notification-header">
                <img src={notification.imgUrl} className="avatar avatar-xs" alt="User Avatar"/>
                <div>
            <NotificationType notification={notification} onApprove={onApprove} onDecline={onDecline}/>
            <Moment fromNow>{notification.createdAt}</Moment>
                </div>
            <img src={xMark} onClick={()=> onDeleteNotification(notification)} className="x-mark" alt="Close"/>
            </div>
        </div>
    )
}
