import React, {useState} from 'react';
import addFriendImg from '../assets/svg/friends.svg'
import friendReqSent from '../assets/svg/ok.svg'


export default ({ contact , onAddFriend }) => {
;

const [isFriendSent, setIsFriendSent] = useState(false)

const toggleIsFriend = (ev) =>{
    ev.preventDefault()
    setIsFriendSent(true)
    console.log('hiiiii');  
}

const handelClick = (ev) =>{
    onAddFriend(ev,contact._id) ;
    toggleIsFriend(ev)

}
    
    return (
        <div className="contact-preview">
            <img src={contact.imgUrl} alt={`${contact.userName}`} className="avatar avatar-s"/>
            <div className="user-name-container">
            <span>User Name: {contact.userName}</span>
            <span>full Name: {contact.fullName}</span>
            </div>
            <img src={isFriendSent ? friendReqSent : addFriendImg} alt="" className="add-friend-img" onClick={(ev) => handelClick(ev)}/>
            {/* <img src={addFriendImg} alt="" className="add-friend-img" onClick={(ev) => onAddFriend(ev,contact._id) ; (ev) => toggleIsFriend(ev)}/> */}
        </div>
    );
};