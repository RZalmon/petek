import React, { useState, useEffect } from 'react';
import addFriendImg from '../assets/svg/friends.svg'
import friendReqSent from '../assets/svg/ok.svg'


export default ({ contact, onAddFriend, loggedinUser }) => {
    ;

    const [isFriendSent, setIsFriendSent] = useState(false)
    const [isFriend, setIsFriend] = useState(false)

    useEffect(() => {
        if(!loggedinUser) return
        let friend = loggedinUser.friends.find(friend =>{return friend._id === contact._id})
        friend ? setIsFriend(true) : setIsFriend(false)   
      });

    const toggleIsFriend = (ev) => {
        ev.preventDefault()
        setIsFriendSent(true)
        
    }

    const handelClick = (ev) => {
        onAddFriend(ev, contact._id);
        toggleIsFriend(ev)
    }

    return (
        <div className="contact-preview">
            <img src={contact.imgUrl} alt={`${contact.userName}`} className="avatar avatar-s" />
            <div className="user-name-container">
                <span>User Name: {contact.userName}</span>
                <span>full Name: {contact.fullName}</span>
            </div>
            {!contact.roomId &&
             <img src={isFriendSent || isFriend ? friendReqSent : addFriendImg} 
             alt=""
              className="add-friend-img"
               onClick={(ev) => isFriend || isFriendSent ? toggleIsFriend(ev) : handelClick(ev)}/>}
        </div>
    );
};