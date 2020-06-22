import React, { useState } from 'react'
import Moment from 'react-moment';

import xMark from '../assets/svg/x-mark.svg'
import editIcon from '../assets/svg/edit.svg'
import saveIcon from '../assets/svg/save.svg'

import NoteText from './Note/NoteText'
import NoteImg from './Note/NoteImg'
import NoteVideo from './Note/NoteVideo'
import NoteTodo from './Note/NoteTodo'


export default ({ note, userId, removeNote, saveTodoEdit }) => {
    const [isEdit, setIsEdit] = useState(false);

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
                    <div className="note-header">
                        <img src={xMark} className="remove-btn" onClick={() => removeNote(note._id)} />
                        {((note.type === 'NoteTodo' || note.type === 'NoteText') && !isEdit) && <img src={editIcon} alt="edit note" className="edit-btn" onClick={() => setIsEdit(true)} />}
                        {((note.type === 'NoteTodo' || note.type === 'NoteText') && isEdit) && <img src={saveIcon} alt="save note" className="save-btn" onClick={() => {setIsEdit(false); saveTodoEdit()}} />}
                        <Moment format="MM/DD/YY ,HH:mm">{note.createdAt}</Moment>
                    </div>
                    <NoteType note={note} userId={userId} isEdit={isEdit} />
                </div>
            </div>
        </div>
    )
}
