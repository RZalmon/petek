import React from 'react';

export default ({ contact }) => {
    return (
        <div className="contact-preview">
            <img src={contact.imgUrl? contact.imgUrl : `https://robohash.org/${contact.userName}.png`} alt={`${contact.userName}`} className="avatar avatar-s"/>
            <span>User Name: {contact.userName}</span>
            <span>full Name: {contact.fullName}</span>
        </div>
    );
};