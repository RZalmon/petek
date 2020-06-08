import React from 'react'

export default ({ notification }) => {    
    return (
        <div className="notification-friend">
            <p>{notification.fullName} wants to start a board with you</p>
            <button>Approve</button>
            <button>Decline</button>
        </div>
    )
}
