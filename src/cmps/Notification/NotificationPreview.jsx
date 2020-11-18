import React from 'react'
import NotificationFriend from './NotificationFriend'
import NotificationResponse from './NotificationResponse'
import NotificationNote from './NotificationNote'
import NotificationStarredNote from './NotificationStarredNote'
import Moment from 'react-moment';

import xMark from '../../assets/svg/x-mark.svg'
import RemoveIcon from '../icons/RemoveIcon'


export default ({ notification, onApprove, onDecline, onDeleteNotification }) => {
    const cmps = {
        NotificationFriend,
        NotificationResponse,
        NotificationNote,
        NotificationStarredNote
    }


    const NotificationType = cmps[notification.type];
    return (
        <div className="notification-preview">
            <div className="notification-header">
                <img src={notification.imgUrl} className="avatar avatar-xs" alt="User Avatar" />
                <div>
                    <NotificationType notification={notification} onApprove={onApprove} onDecline={onDecline} onDeleteNotification={onDeleteNotification} />
                    <Moment fromNow>{notification.createdAt}</Moment>
                </div>
                <i onClick={() => onDeleteNotification(notification)} ><RemoveIcon /></i>
                {/* <img src={xMark} onClick={()=> onDeleteNotification(notification)} className="x-mark" alt="Close"/> */}
            </div>
        </div>
    )
}
