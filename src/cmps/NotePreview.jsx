import React from 'react'
import Moment from 'react-moment';

import xMark from '../assets/svg/x-mark.svg'

import NoteText from './Note/NoteText'
import NoteImg from './Note/NoteImg'
import NoteVideo from './Note/NoteVideo'
import NoteTodo from './Note/NoteTodo'


export default ({ note, userId, removeNote }) => {
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
                <img src={note.createdBy.imgUrl} alt="Note creator avatar" className="avatar avatar-s" />
                <div className="note-container" >
                    <img src={xMark} className="remove-btn" onClick={() => removeNote(note._id)}/>
                    <div className="date">
                        <Moment format="MM/DD/YY ,HH:mm">{note.createdAt}</Moment>
                    </div>
                    <NoteType note={note} userId={userId} />
                </div>
            </div>
        </div>
    )
}
