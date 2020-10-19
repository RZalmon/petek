import React, { useEffect, useState, createRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group';

import Moment from 'react-moment';

import NoteText from "./NoteText";
import NoteImg from "./NoteImg";
import NoteVideo from "./NoteVideo";
import NoteTodo from "./NoteTodo";
import NoteLoc from "./NoteLoc";
import Features from "./Features";

import RemoveIcon from "../../cmps/icons/RemoveIcon";
import EditIcon from "../../cmps/icons/EditIcon";
import SaveIcon from "../../cmps/icons/SaveIcon";

import AvatarLoader from '../AvatarLoader'
import { changeNoteColor } from '../../actions/RoomActions';
import { Note } from '@material-ui/icons';


export default ({ room, note, user, removeNote, saveRoomChanges, togglePinned, toggleStarredNote, changeNoteColor, toggleNotePin, updateNote, updateMembers, isStarredPage }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currTodoIdx, setCurrTodoIdx] = useState(null);
    const [textEdit, setTextEdit] = useState('')
    const [isLoaded, setIsLoaded] = useState(false);

    const cmps = {
        NoteText,
        NoteImg,
        NoteVideo,
        NoteTodo,
        NoteLoc
    }

    const NoteType = cmps[note.type];

    const noteRef = createRef();

    const setNoteColor = (color) => {//DELETE
        note.bgColor = color;
        saveRoomChanges();
    };

    const paintNote = () => {//KEEP
        if (note.bgColor && noteRef.current) noteRef.current.style.backgroundColor = note.bgColor
    }

    const saveNoteEdits = async (type) => {
        let noteCopy = JSON.parse(JSON.stringify(note));
        (type === 'NoteText' && textEdit) ? noteCopy.data = textEdit : setCurrTodoIdx('');
        await updateNote(room._id, noteCopy);
        updateMembers();
    }


    const handleRemoveClicked = async () => {
        let roomId = getRoomId()
        await removeNote(roomId, note._id); 
        if (!isStarredPage) updateMembers();
    }

    const getRoomId = () => { //MAYBE SHOULD BE IN PAGE CMP
        return isStarredPage ? note.roomId : room._id
    }


    const onLoad = useCallback(() => {
        console.log("loaded");
        setIsLoaded(true);
    }, []);


    useEffect(() => {
        if (note.createdBy._id !== user._id) return
        if (note.createdBy.imgUrl !== user.imgUrl) {
            note.createdBy.imgUrl = user.imgUrl
            saveRoomChanges()
        }
    }, []);

    useEffect(() => {
        paintNote();
        if (note.createdBy._id !== user._id) return;
        if (note.createdBy.imgUrl !== user.imgUrl) {
            note.createdBy.imgUrl = user.imgUrl;
            saveRoomChanges();
        }

    }, []);

    useEffect(() => {
        paintNote();
    }, [note.bgColor]);

    return (
        <div className="note-preview" style={{ backgroudColor: note.bgColor }}>
            <div className={user._id === note.createdBy._id ? 'user-container' : 'friend-container'}>
                <img src={note.createdBy.imgUrl} alt="Note creator avatar" className="avatar avatar-s" onLoad={onLoad} style={{ display: isLoaded ? 'block' : 'none' }} />
                {!isLoaded && <AvatarLoader />}
                <div className="note-container" ref={noteRef}>
                    <div className="note-header">
                        <div>
                            {((note.type === 'NoteTodo' || note.type === 'NoteText') && !isEdit) && <i onClick={() => setIsEdit(true)}><EditIcon /></i>}
                            {((note.type === 'NoteTodo' || note.type === 'NoteText') && isEdit) && <i onClick={() => { setIsEdit(false); saveNoteEdits(note.type) }}><SaveIcon /></i>}
                            <i onClick={handleRemoveClicked}><RemoveIcon /></i>

                        </div>
                        <Moment format="MM/DD/YY ,HH:mm">{note.createdAt}</Moment>
                    </div>
                    <NoteType note={note} user={user} isEdit={isEdit} currTodoIdx={currTodoIdx} setCurrTodoIdx={setCurrTodoIdx} textEdit={textEdit} setTextEdit={setTextEdit} updateNote={updateNote} updateMembers={updateMembers} />
                    <Features room={room} togglePinned={togglePinned} note={note} user={user} changeNoteColor={changeNoteColor} toggleNotePin={toggleNotePin} setNoteColor={setNoteColor} toggleStarredNote={toggleStarredNote} updateMembers={updateMembers} isStarredPage={isStarredPage} roomId={getRoomId()} />
                </div>
            </div>
        </div>
    )
}
