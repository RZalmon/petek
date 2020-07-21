import React, { useEffect, useState, createRef } from 'react'
import Moment from 'react-moment';


import NoteText from './Note/NoteText'
import NoteImg from './Note/NoteImg'
import NoteVideo from './Note/NoteVideo'
import NoteTodo from './Note/NoteTodo'
import NoteLoc from './Note/NoteLoc'
import Features from './Note/Features'

import RemoveIcon from '../cmps/icons/RemoveIcon'
import EditIcon from '../cmps/icons/EditIcon'
import SaveIcon from '../cmps/icons/SaveIcon'

export default ({ note, user, removeNote, saveRoomChanges, togglePinned }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isNewTodo, setIsNewTodo] = useState(false);
    const [currTodoIdx, setCurrTodoIdx] = useState('');

    const cmps = {
        NoteText,
        NoteImg,
        NoteVideo,
        NoteTodo,
        NoteLoc
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

    const saveTodoEdits = () => {
        saveRoomChanges();
        setCurrTodoIdx('')
    }

    useEffect(() => {
        paintNote()
        if (note.createdBy._id !== user._id) return
        if (note.createdBy.imgUrl !== user.imgUrl) {
            note.createdBy.imgUrl = user.imgUrl
            saveRoomChanges()
        }
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
                        <div>
                            {/* {((note.type === 'NoteTodo' || note.type === 'NoteText') && !isEdit) && <img src={editIcon} alt="Edit note" className="edit-btn" onClick={() => setIsEdit(true)} />} */}
                            {((note.type === 'NoteTodo' || note.type === 'NoteText') && !isEdit) && <i onClick={() => setIsEdit(true)}><EditIcon /></i>}
                            {((note.type === 'NoteTodo' || note.type === 'NoteText') && isEdit) && <i onClick={() => { setIsEdit(false); saveTodoEdits() }}><SaveIcon /></i>}
                            {/* {((note.type === 'NoteTodo' || note.type === 'NoteText') && isEdit) && <img src={saveIcon} alt="Save changes" className="save-btn" onClick={() => { setIsEdit(false); saveRoomChanges(); setCurrTodoIdx('') }} />} */}
                            <i onClick={() => removeNote(note._id)}><RemoveIcon /></i>
                        </div>
                        <Moment format="MM/DD/YY ,HH:mm">{note.createdAt}</Moment>
                    </div>
                    <NoteType note={note} user={user} isEdit={isEdit} currTodoIdx={currTodoIdx} setCurrTodoIdx={setCurrTodoIdx} setIsNewTodo={setIsNewTodo} isNewTodo={isNewTodo} />
                    <Features togglePinned={togglePinned} note={note} user={user} setNoteColor={setNoteColor} />
                </div>
            </div>
        </div>
    )
}
