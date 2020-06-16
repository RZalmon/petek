import React from 'react'
import NotificationFriend from './NotificationFriend'
import NotificationResponse from './NotificationResponse'
import NotificationNote from './NotificationNote'


export default ({ notification,onApprove, onDecline, onDeleteNotification }) => {
    const cmps = {
        NotificationFriend,
        NotificationResponse,
        NotificationNote
    }
  

    const NotificationType = cmps[notification.type];
    return (
        <div className="notification-preview">
            <NotificationType notification={notification} onApprove={onApprove} onDecline={onDecline}/>
            <button onClick={()=> onDeleteNotification(notification)}>X</button>
        </div>
    )
}
