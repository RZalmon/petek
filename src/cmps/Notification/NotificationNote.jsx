import React from 'react'
import { Link } from 'react-router-dom';


export default ({ notification, onDeleteNotification }) => {

    const {userName, roomId} = notification

    return (
        <Link to={`/board/${roomId}`} >
        <div className="notification-note" onClick={onDeleteNotification}>
            <p>{userName} just Added A note! go check it out</p>
        </div>
        </Link>
    )
}
