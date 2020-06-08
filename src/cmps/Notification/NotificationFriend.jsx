import React from 'react'

export default ({ notification,onApprove,onDecline }) => {    
    return (
        <div className="notification-friend">
            <p>{notification.fullName} wants to start a board with you</p>
            <button onClick={()=>onApprove(notification)}>Approve</button>
            <button onClick={()=>onDecline(notification)}>Decline</button>
        </div>
    )
}
