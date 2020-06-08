import React from 'react';
import addFriendImg from '../assets/svg/friends.svg'
import { Link } from 'react-router-dom';


export default ({ contact, onAddFriend }) => {
    console.log('preview',contact);
    
    return (
        <div className="contact-preview">
            <Link to={'/board/' + contact._id}>
                <img src={contact.imgUrl} alt={`${contact.userName}`} className="avatar avatar-s" />
                <div className="user-name-container">
                    <span>User Name: {contact.userName}</span>
                    <span>full Name: {contact.fullName}</span>
                </div>
            </Link>
            {!contact.roomId && <img src={addFriendImg} alt="" className="add-friend-img" onClick={onAddFriend} />}
        </div>
    );
};