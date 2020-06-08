import React from 'react';
import addFriendImg from '../assets/svg/friends.svg'


export default ({ contact , onAddFriend }) => {
;
    
    
    return (
        <div className="contact-preview">
            <img src={contact.imgUrl} alt={`${contact.userName}`} className="avatar avatar-s"/>
            <div className="user-name-container">
            <span>User Name: {contact.userName}</span>
            <span>full Name: {contact.fullName}</span>
            </div>
            <img src={addFriendImg} alt="" className="add-friend-img" onClick={(ev) => onAddFriend(ev,contact._id)}/>
        </div>
    );
};