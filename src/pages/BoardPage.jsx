import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { UtilService } from '../services/UtilService'
import SocketService from '../services/SocketService'
import CloudinaryService from '../../src/services/CloudinaryService'



import { loadRoomById, saveRoom, resetCurrRoom } from '../actions/RoomActions';
import { updateUser } from '../actions/UserActions';

import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/NoteList'
import Filter from '../cmps/Filter'
import Loading from '../cmps/Loading'
import SplashIcon from '../cmps/icons/SplashIcon'

import InputText from '../cmps/Note/InputText'
import InputImg from '../cmps/Note/InputImg'
import InputVideo from '../cmps/Note/InputVideo'
import InputTodo from '../cmps/Note/InputTodo'

import { UserService } from '../services/UserService';

const BoardPage = (props) => {
    const [noteType, setNoteType] = useState('');
    const [noteHeader, setNoteHeader] = useState('');
    const [noteData, setNoteData] = useState('');
    const [noteInputType, setNoteInputType] = useState('InputText');
    const [isUploading, setIsUploading] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [filterBy, setfilterBy] = useState('');


    const newNote = {
        header: noteHeader,
        data: noteData,
        type: noteType,
    }

    const cmps = {
        InputText,
        InputImg,
        InputVideo,
        InputTodo
    }

    const InputType = cmps[noteInputType];


    const loadRoom = async () => {
        const roomId = props.match.params.id;
        await props.loadRoomById({ term: filterBy.term, roomId });
    }


    const saveRoomChanges = async () => {
        await props.saveRoom(props.room)
        SocketService.emit("roomUpdated", { room: props.room, userId: props.user._id });

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

    const onFilterHandler = (filterBy) => {
        setfilterBy(filterBy)
    };


    const onHandleSubmit = async (ev) => {
        const { user } = props
        if (ev) ev.preventDefault()
        newNote._id = UtilService.makeId(24)
        newNote.createdAt = Date.now() //maybe server side should handle it
        let minimalUser = await UserService.getMinimalUser(user._id, user.imgUrl)
        newNote.createdBy = minimalUser
        const friend = user.friends.find(friend => { return friend.roomId === props.match.params.id })
        props.room.notes.unshift(newNote)
        props.saveRoom(props.room)
        SocketService.emit("added note", ({ room: props.room, user: props.user, friendId: friend._id }));
        setNoteHeader('')
        setNoteData('')
        setNoteType('')
        setIsUploading(false)
    }

    const togglePinned = (note) => {
        let choosenNote = props.user.pinnedNotes.find(id => note._id === id)
        !choosenNote ? props.user.pinnedNotes.push(note._id) : props.user.pinnedNotes.splice(note._id, 1)
        let idx = props.room.notes.findIndex(currNote => note._id === currNote._id)
        props.room.notes.splice(idx, 1, note)
        props.saveRoom(props.room)
        props.updateUser(props.user)
    }


    const removeNote = async (noteId) => {
        let idx = props.room.notes.findIndex(note => note._id === noteId)
        props.room.notes.splice(idx, 1)
        await props.saveRoom(props.room)
        SocketService.emit("roomUpdated", { room: props.room, userId: props.user._id });
    }

    useEffect(() => {
        loadRoom()
        return () => { props.resetCurrRoom() };
    }, []);

    useEffect(() => {
        if ((noteData && noteType === 'NoteImg') || noteType === 'NoteVideo') {
            onHandleSubmit()
        }
    }, [isUploading]);

    useEffect(() => {
        loadRoom()
    }, [filterBy]);


    if (props.room) var { notes } = props.room

    return (
        <div className="board-page">
            {notes ? <div className="note-add">
                <Filter filterBy={filterBy} onFilter={onFilterHandler} placeHolder={"Search for notes"} />
                {noteType && <InputType
                    addVideo={onAddVideo}
                    onUploadImg={onUploadImg}
                    handleSubmit={onHandleSubmit}
                    setNoteHeader={setNoteHeader}
                    setNoteData={setNoteData}
                    noteData={noteData} />}
                <ButtonMenu setNoteType={setNoteType} setNoteInputType={setNoteInputType} setNoteData={setNoteData} />
            </div> : <Loading />}
            {notes && <div>
                {!!notes.length && <NoteList notes={notes} user={props.user} removeNote={removeNote} saveRoomChanges={saveRoomChanges} togglePinned={togglePinned} setNoteType={setNoteType} isPinned={isPinned} />}
            </div>}
            <SplashIcon className="splash-icon" />
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
    updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);