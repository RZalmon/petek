import React from 'react'
import NotificationFriend from './NotificationFriend'


export default ({ notification }) => {
    const cmps = {
        NotificationFriend
    }
    const NotificationType = cmps[notification.type];
    return (
        <div className="notification-preview">
            <NotificationType notification={notification} />
        </div>
    )
}
