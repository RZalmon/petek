import React from 'react'

export default ({ notification }) => {
    return (
        <div className="notification-decline">
            <p>{notification.fullName} has declined your board request</p>
        </div>
    )
}
