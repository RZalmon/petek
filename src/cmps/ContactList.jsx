import React from 'react'

import ContactPreview from './ContactPreview'
export default (props) => {
    const {onAddFriend} = props
    return (
        <div className="contact-list">
            {props.contacts.map(contact => {
                return (
                   <ContactPreview contact={contact}  key={contact._id} onAddFriend={onAddFriend} />
                )
            })}
        </div>
    );
};
