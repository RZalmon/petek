import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';

import { UtilService } from '../services/UtilService'
import SocketService from '../services/SocketService'
import CloudinaryService from '../../src/services/CloudinaryService'



import { loadRoomById, saveRoom, resetCurrRoom } from '../actions/RoomActions';

import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/NoteList'

import InputText from '../cmps/InputText'
import InputVideo from '../cmps/InputVideo'
import InputTodo from '../cmps/InputTodo'

import { UserService } from '../services/UserService';

const BoardPage = (props) => {
    const [noteType, setNoteType] = useState('');
    const [noteHeader, setNoteHeader] = useState('');
    const [noteData, setNoteData] = useState('');
    const [noteInputType, setNoteInputType] = useState('InputText');
    const [isUploading, setIsUploading] = useState(false);

    const inputRef = createRef();


    const newNote = {
        header: noteHeader,
        data: noteData,
        type: noteType
    }

    const cmps = {
        InputText,
        InputVideo,
        InputTodo
    }

    const InputType = cmps[noteInputType];


    const loadRoom = async () => {
        const roomId = props.match.params.id;
        await props.loadRoomById(roomId);
    }


    // if (props.room) var { notes } = props.room

    const onUploadImgHandler = () => {
        inputRef.current.click()
        setNoteType('NoteImg');
    }

    const onUploadImg = async (ev) => {
        if (noteType === 'NoteImg') {
            const imgUrl = await CloudinaryService.uploadImg(ev)
            setNoteData(imgUrl.secure_url)
            setIsUploading(true)
        }

    }

    const onAddVideo = (videoId) => {
        setNoteData(videoId)
        setIsUploading(true)
    }


    const onHandleSubmit = async (ev) => {
        console.log('invoked');

        const { user } = props
        if (ev) ev.preventDefault()
        newNote._id = UtilService.makeId(24)
        newNote.createdAt = Date.now()
        let minimalUser = await UserService.getMinimalUser(user._id, user.imgUrl)
        newNote.createdBy = minimalUser
        const friend = user.friends.find(friend => { return friend.roomId === props.match.params.id })
        console.log('newNote is:', newNote);
        props.room.notes.unshift(newNote)
        props.saveRoom(props.room)
        SocketService.emit("added note", ({ room: props.room, user: props.user, friendId: friend._id }));
        setNoteHeader('')
        setNoteData('')
        setNoteType('')
        setIsUploading(false)
    }

    const removeNote = (noteId) => {
        let idx = props.room.notes.findIndex(note => note._id === noteId)
        props.room.notes.splice(idx, 1)
        props.saveRoom(props.room)
        SocketService.emit("updateRoom", (props.room));
    }

    useEffect(() => {
        if ((noteData && noteType === 'NoteImg') || noteType === 'NoteVideo') {
            onHandleSubmit()
        }
    }, [isUploading]);


    useEffect(() => {
        loadRoom()        
        return () => { props.resetCurrRoom() };
    }, []);

    if (props.room) var { notes } = props.room

    return (
        <div className="board-page">
            <div className="note-add">
                <input type="file" onChange={(ev) => { onUploadImg(ev); setNoteType('NoteImg'); }} ref={inputRef} hidden />
                {noteType && <InputType
                    addVideo={onAddVideo}
                    handleSubmit={onHandleSubmit}
                    setNoteHeader={setNoteHeader}
                    setNoteData={setNoteData}
                    noteData={noteData} />}
                <ButtonMenu setNoteType={setNoteType} setNoteInputType={setNoteInputType} onUploadImgHandler={onUploadImgHandler} />
            </div>
            {notes && <div>
                {!!notes.length && <NoteList notes={notes} userId={props.user._id} removeNote={removeNote} />}
            </div>}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
        user: state.user.loggedinUser,

    };
};

const mapDispatchToProps = {
    loadRoomById,
    saveRoom,
    resetCurrRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);