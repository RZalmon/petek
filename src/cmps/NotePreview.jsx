import React from 'react'
import Moment from 'react-moment';

import NoteText from './Note/NoteText'
import NoteImg from './Note/NoteImg'
import NoteVideo from './Note/NoteVideo'
import NoteTodo from './Note/NoteTodo'


export default ({ note, userId }) => {
    const cmps = {
        NoteText,
        NoteImg,
        NoteVideo,
        NoteTodo
    }
    const NoteType = cmps[note.type];
    return (
        <div className="note-preview">
            <div className={userId === note.createdBy._id ? 'user-container' : 'friend-container'}>
            <img src={note.createdBy.imgUrl} alt="" className="avatar avatar-s"/>
            <div className="note-container" >
                <div className="date">
             <Moment format="MM/DD/YY ,HH:mm">{note.createdAt}</Moment>
                </div>
            <NoteType note={note} />
            </div>
            </div>
        </div>
    )
}
