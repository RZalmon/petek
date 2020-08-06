import React, { useState, useEffect } from 'react';
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';



import addFriendImg from '../assets/svg/friends.svg'
import friendReqSent from '../assets/svg/ok.svg'
import addNote from '../assets/svg/notes.svg'
import deleteUser from '../assets/svg/delete.svg'


export default ({ contact, onAddFriend, loggedinUser, moveToRoom,isHome }) => {


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
        // ev.preventDefault()
        setIsFriendSent(true)

    }
    

    const handelClick = (ev) => {
        onAddFriend(contact._id);
        toggleIsFriend(ev)
    }


    return (
        <div className="swipe-container">
      <SwipeableListItem 
      
    swipeLeft={{
        content:<img className="swipe-content-left" src={deleteUser}/>,
        action: (ev) => {console.log('balls');},
        
    }}
    swipeRight={{
        content:isHome ? <img src={isFriendSent || isFriend ? friendReqSent : addFriendImg} className="add-friend-img"/> :  <img className="swipe-content-right" src={addNote}/>,
        action: isHome ?  (ev) => isFriend || isFriendSent ? toggleIsFriend(ev) : handelClick(ev) : (ev) => { moveToRoom(ev,roomId)},
        
    }} 
    >
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
         </SwipeableListItem>
        </div>
       

    );
};