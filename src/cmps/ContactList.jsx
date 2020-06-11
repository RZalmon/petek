import React from 'react'
import { Link } from 'react-router-dom';

import ContactPreview from './ContactPreview'
export default (props) => {
    const { onAddFriend, loggedinUser, onMoveToRoom } = props

    // const getRoomId = () => {
    //     const roomId = contact.friends.find(friend => friend._id === loggedinUser._id).roomId
    //     console.log(roomId);
    //     return roomId
    // }

    return (
        <div className="contact-list">
            {props.contacts.map(contact => {
                return (
                    <ContactPreview
                        contact={contact}
                        onAddFriend={onAddFriend}
                        loggedinUser={loggedinUser}
                        key={contact._id}
                        moveToRoom={onMoveToRoom}
                    />
                )
            })}
        </div>
    );
};
