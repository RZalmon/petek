import React, { useEffect, useState, createRef } from 'react'
import Moment from 'react-moment';

import xMark from '../assets/svg/x-mark.svg'
import editIcon from '../assets/svg/edit.svg'
import saveIcon from '../assets/svg/save.svg'

import NoteText from './Note/NoteText'
import NoteImg from './Note/NoteImg'
import NoteVideo from './Note/NoteVideo'
import NoteTodo from './Note/NoteTodo'
import Features from '../cmps/Features'


export default ({ note, user, removeNote, saveRoomChanges, togglePinned, isPinned }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isNewTodo, setIsNewTodo] = useState(false);
    const [currTodoIdx, setCurrTodoIdx] = useState('');

    const cmps = {
        NoteText,
        NoteImg,
        NoteVideo,
        NoteTodo
    }
    const NoteType = cmps[note.type];

    const noteRef = createRef();

    const setNoteColor = (color) => {
        note.bgColor = color
        saveRoomChanges()
    }

    const paintNote = () => {
        if (note.bgColor) noteRef.current.style.backgroundColor = note.bgColor
    }


    useEffect(() => {
        paintNote()
    }, []);


    useEffect(() => {
        paintNote()
    }, [note.bgColor]);

    return (
        <div className="note-preview" >
            <div className={user._id === note.createdBy._id ? 'user-container' : 'friend-container'}>
                <img src={note.createdBy.imgUrl} alt="Note creator avatar" className="avatar avatar-s" />
                <div className="note-container" ref={noteRef}>
                    <div className="note-header">
                        <img src={xMark} className="remove-btn" onClick={() => removeNote(note._id)} />
                        {((note.type === 'NoteTodo' || note.type === 'NoteText') && !isEdit) && <img src={editIcon} alt="Edit note" className="edit-btn" onClick={() => setIsEdit(true)} />}
                        {((note.type === 'NoteTodo' || note.type === 'NoteText') && isEdit) && <img src={saveIcon} alt="Save changes" className="save-btn" onClick={() => { setIsEdit(false); saveRoomChanges(); setCurrTodoIdx('') }} />}
                        <Moment format="MM/DD/YY ,HH:mm">{note.createdAt}</Moment>
                    </div>
                    <NoteType note={note} user={user} isEdit={isEdit} currTodoIdx={currTodoIdx} setCurrTodoIdx={setCurrTodoIdx} setIsNewTodo={setIsNewTodo} isNewTodo={isNewTodo} />
                    <Features togglePinned={togglePinned} isPinned={isPinned} note={note} user={user} setNoteColor={setNoteColor} />
                </div>
            </div>
        </div>
    )
}
