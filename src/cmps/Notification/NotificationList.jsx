import React from 'react'
import NotificationPreview from './NotificationPreview'

export default ({notifications, onApprove, onDecline,onDeleteNotification}) => {
    console.log(onApprove);
    

    return (
        <div className="notification-list">
            {notifications.map(notification => {
                return (
                    <NotificationPreview notification={notification} key={notification._id} onApprove={onApprove} onDecline={onDecline} onDeleteNotification={onDeleteNotification}  />
                )
            })}
        </div>
    )
}
