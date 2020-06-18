import React, { useState, useEffect, useRef, createRef } from 'react';
import { connect } from 'react-redux';

import { UtilService } from '../services/UtilService'
import SocketService from '../services/SocketService'
import CloudinaryService from '../../src/services/CloudinaryService'



import { loadRoomById, saveRoom, resetCurrRoom } from '../actions/RoomActions';

import TextInput from '../cmps/TextInput'
import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/NoteList'
import SearchVideo from '../cmps/SearchVideo'

import { UserService } from '../services/UserService';

const BoardPage = (props) => {
    const [noteData, setNoteData] = useState('');
    const [noteType, setNoteType] = useState('NoteText');
    const [isImg, setImgStat] = useState(false);

    const inputRef = createRef();


    const newNote = {
        data: noteData,
        type: noteType
    }


    const loadRoom = async () => {
        const roomId = props.match.params.id;
        await props.loadRoomById(roomId);
    }


    if (props.room) var { notes } = props.room

    const onUploadImgHandler = () => {
        inputRef.current.click()
        setNoteType('NoteImg');
    }

    const onUploadImg = async (ev) => {
        if (noteType === 'NoteImg') {
            const imgUrl = await CloudinaryService.uploadImg(ev)
            setNoteData(imgUrl.secure_url)
            setImgStat(true)
        }

    }

    const onAddVideo = (videoId) => {
        setNoteData(videoId)
        onHandleSubmit()
    }


    const onHandleSubmit = async (ev) => {
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
        setNoteData('')
        setNoteType('NoteText')
        setImgStat(false)
    }


    useEffect(() => {
        if (noteData && noteType === 'NoteImg' || noteType === 'NoteVideo') onHandleSubmit()

    }, [isImg]);


    useEffect(() => {

        loadRoom()

        return () => { props.resetCurrRoom() };

    }, []);


    return (
        <div className="board-page">
            <div className="note-add">
                <input type="file" onChange={(ev) => { onUploadImg(ev); setNoteType('NoteImg'); }} ref={inputRef} hidden />
                {/* <TextInput setNoteData={setNoteData} handleSubmit={onHandleSubmit} /> */}

                {noteType === 'NoteVideo'
                    ? <SearchVideo addVideo={onAddVideo} />
                    : <TextInput setNoteData={setNoteData} handleSubmit={onHandleSubmit} />
                }
                <ButtonMenu setNoteType={setNoteType} onUploadImgHandler={onUploadImgHandler} />
            </div>
            {notes && <div>
                {!!notes.length && <NoteList notes={notes} userId={props.user._id} />}
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
    saveRoom,

};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);