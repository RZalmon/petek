import React from 'react'

import ContactPreview from './ContactPreview'
export default (props) => {
    const { onAddFriend, loggedinUser, onMoveToRoom, isHome } = props


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
                        isHome={isHome}
                    />
                )
            })}
        </div>
    );
};
