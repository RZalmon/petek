import React, {useState} from 'react'
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import addNote from '../assets/svg/notes.svg'
import deleteUser from '../assets/svg/delete.svg'


import ContactPreview from './ContactPreview'
export default (props) => {
    const { onAddFriend, loggedinUser, onMoveToRoom, isHome } = props
    
        const [roomId, setRoomId] = useState('')




    return (
        <div className="contact-list swipe-container">
            {props.contacts.map(contact => {
                return (
                    <div key={contact._id}>
              {!isHome ? <SwipeableListItem 
              swipeLeft={{
                     content:<img className="swipe-content-left" src={deleteUser}/>,
                     action: (ev) => {console.log('balls');},
                       
                       
                    }}
                    swipeRight={{
                        content: <img className="swipe-content-right" src={addNote}/>,
                        action:  (ev) => { onMoveToRoom(ev,contact.roomId)},
                        key:contact._id
        
    }} 
    >
                    <ContactPreview
                        contact={contact}
                        onAddFriend={onAddFriend}
                        loggedinUser={loggedinUser}
                        key={contact._id}
                        moveToRoom={onMoveToRoom}
                        isHome={isHome}
                        setRoomId={setRoomId}
                        roomId={roomId}
                    />
            </SwipeableListItem> : 
               <ContactPreview
                        contact={contact}
                        onAddFriend={onAddFriend}
                        loggedinUser={loggedinUser}
                        key={contact._id}
                        moveToRoom={onMoveToRoom}
                        isHome={isHome}
                        setRoomId={setRoomId}
                        roomId={roomId}

                    />}
            </div>
                )
            })}
        </div>
        
    );
};




// import React from 'react'

// import ContactPreview from './ContactPreview'
// export default (props) => {
//     const { onAddFriend, loggedinUser, onMoveToRoom, isHome } = props


//     return (
//         <div className="contact-list">
//             {props.contacts.map(contact => {
//                 return (
//                     <ContactPreview
//                         contact={contact}
//                         onAddFriend={onAddFriend}
//                         loggedinUser={loggedinUser}
//                         key={contact._id}
//                         moveToRoom={onMoveToRoom}
//                         isHome={isHome}
//                     />
//                 )
//             })}
//         </div>
//     );
// };
