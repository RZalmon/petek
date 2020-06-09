import React from 'react'

export default ({ notification }) => {
    return (
        <div className="notification-response">
            <p>{notification.fullName} has {notification.isApproved ? 'Approved' : 'Declined'} your request</p>
        </div>
    )
}
