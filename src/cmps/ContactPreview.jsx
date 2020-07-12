import React, { useState, useEffect } from 'react';

import addFriendImg from '../assets/svg/friends.svg'
import friendReqSent from '../assets/svg/ok.svg'


export default ({ contact, onAddFriend, loggedinUser, moveToRoom }) => {


    const [isFriendSent, setIsFriendSent] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [roomId, setRoomId] = useState('')

    useEffect(() => {
        if (!loggedinUser) return
        let friend = loggedinUser.friends.find(friend => { return friend._id === contact._id })
        if (friend) {
            setIsFriend(true)
            setRoomId(friend.roomId)
        } else {
            setIsFriend(false)
        }
    },[loggedinUser, contact._id]);

    const toggleIsFriend = (ev) => {
        ev.preventDefault()
        setIsFriendSent(true)

    }

    const handelClick = (ev) => {
        onAddFriend(contact._id);
        toggleIsFriend(ev)
    }


    return (
        <div className="contact-preview" onClick={(ev) => {if(isFriend) moveToRoom(ev,roomId) }}>
            <img src={contact.imgUrl} alt={`${contact.userName}`} className="avatar avatar-s" />
            <div className="user-name-container">
                <span>Full Name: {contact.fullName}</span>
                <span>User Name: {contact.userName}</span>
            </div>
            {!contact.roomId &&
                <img src={isFriendSent || isFriend ? friendReqSent : addFriendImg}
                    alt=""
                    className="add-friend-img"
                    onClick={(ev) => isFriend || isFriendSent ? toggleIsFriend(ev) : handelClick(ev)} />}
        </div>
    );
};