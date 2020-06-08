import React from 'react'
import NotificationFriend from './NotificationFriend'


export default ({ notification,onApprove, onDecline }) => {
    const cmps = {
        NotificationFriend
    }
  

    const NotificationType = cmps[notification.type];
    return (
        <div className="notification-preview">
            <NotificationType notification={notification} onApprove={onApprove} onDecline={onDecline}/>
        </div>
    )
}
