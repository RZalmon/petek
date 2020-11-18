import React from 'react'

export default ({ notification,onApprove,onDecline }) => {    
    return (
        <div className="notification-friend">
            <p>{notification.fullName} wants to start a board with you</p>
            <button className="btn approve" onClick={()=>onApprove(notification)}>Approve</button>
            <button className="btn decline" onClick={()=>onDecline(notification)}>Decline</button>
        </div>
    )
}
