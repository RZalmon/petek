import React from 'react'
import NotificationPreview from './NotificationPreview'

export default ({notifications}) => {
    return (
        <div className="notification-list">
            {notifications.map(notification => {
                return (
                    <NotificationPreview notification={notification} key={notification._id} />
                )
            })}
        </div>
    )
}
