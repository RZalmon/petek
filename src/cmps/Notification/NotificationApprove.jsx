import React from 'react'

export default ({ notification }) => {
    return (
        <div className="notification-approve">
            <p>{notification.fullName} has Approved your board request</p>
        </div>
    )
}
