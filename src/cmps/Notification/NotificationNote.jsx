import React from 'react'
import { Link } from 'react-router-dom';


export default ({ notification }) => {

    const {userName, roomId} = notification

    return (
        <Link to={`/board/${roomId}`} >
        <div className="notification-note">
            <p>{userName} just Added A note! go check it out</p>
        </div>
        </Link>
    )
}
