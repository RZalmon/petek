import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import addFriendImg from '../assets/svg/friends.svg'
import friendReqSent from '../assets/svg/ok.svg'


export default ({ contact, onAddFriend, loggedinUser, moveToRoom }) => {
    ;

    const [isFriendSent, setIsFriendSent] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [roomId, setRoomId] = useState('')

    useEffect(() => {
        // console.log('cmon',roomId);
        if (!loggedinUser) return
        let friend = loggedinUser.friends.find(friend => { return friend._id === contact._id })
        if (friend) {
            setIsFriend(true)
            setRoomId(friend.roomId)
        } else {
            setIsFriend(false)
        }
    });

    const toggleIsFriend = (ev) => {
        ev.preventDefault()
        setIsFriendSent(true)

    }

    const handelClick = (ev) => {
        onAddFriend(ev, contact._id);
        toggleIsFriend(ev)

    }

    // const getRoomId = () => {
    //     if (!isFriend) return
    //     const roomId = contact.friends.find(friend => friend._id === loggedinUser._id).roomId
    //     console.log(roomId);
    //     return roomId
    // }

    // const moveToRoom = (ev) => {
    //     // console.log('ev', ev);
    //     console.log('props', props);
    //     // if (isFriend) history.push('/board/' + roomId)
    // }

    return (
        <div className="contact-preview" onClick={(ev) => { moveToRoom(roomId) }}>
            <img src={contact.imgUrl} alt={`${contact.userName}`} className="avatar avatar-s" />
            <div className="user-name-container">
                <span>User Name: {contact.userName}</span>
                <span>full Name: {contact.fullName}</span>
            </div>
            {!contact.roomId &&
                <img src={isFriendSent || isFriend ? friendReqSent : addFriendImg}
                    alt=""
                    className="add-friend-img"
                    onClick={(ev) => isFriend || isFriendSent ? toggleIsFriend(ev) : handelClick(ev)} />}
        </div>
    );
};