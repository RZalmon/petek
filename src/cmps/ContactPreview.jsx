import React from 'react';

export default ({ contact }) => {
    return (
        <div className="contact-preview">
            <img src={`https://robohash.org/${contact.userName}.png`} alt={`${contact.userName}`} />
            <span>User Name: {contact.userName}</span>
            <span>full Name: {contact.fullName}</span>
        </div>
    );
};