import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadRoomById, saveRoom, resetCurrRoom } from '../actions/RoomActions';
import { addNote } from '../actions/NoteActions';
import { updateUser } from '../actions/UserActions';

import ButtonMenu from '../cmps/ButtonMenu'
import NotesContainer from '../cmps/Note/NotesContainer';
import Loading from '../cmps/Loading'
import InputText from '../cmps/Note/InputText'
import InputImg from '../cmps/Note/InputImg'
import InputVideo from '../cmps/Note/InputVideo'
import InputTodo from '../cmps/Note/InputTodo'
import InputLoc from '../cmps/Note/InputLoc'

import { RoomService } from '../services/RoomService';
import SocketService from '../services/SocketService'
import CloudinaryService from '../../src/services/CloudinaryService'




const RoomPage = (props) => {
    const [noteType, setNoteType] = useState('');
    const [noteHeader, setNoteHeader] = useState('');
    const [noteData, setNoteData] = useState('');
    const [noteInputType, setNoteInputType] = useState('InputText');
    const [isUploading, setIsUploading] = useState(false);
    const [isValidUser, setIsValidUser] = useState(null)

    if (props.room) var { notes } = props.room

    const newNote = {
        header: noteHeader,
        data: noteData,
        type: noteType,
        isPinned: false
    }

    const cmps = {
        InputText,
        InputImg,
        InputVideo,
        InputTodo,
        InputLoc
    }
    const InputType = cmps[noteInputType];

    const loadRoom = async () => {
        const roomId = props.room ? props.room._id : props.match.params.id;
        if (props.room) {
            await props.loadRoomById({ ...props.filterBy, roomId })
            // FIX IS VAILD USER
            // checkIsValidUser()
            return
        }
        await props.loadRoomById({ ...props.filterBy, roomId })
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
        if(ev) ev.preventDefault() 
        const { user, room } = props
        let noteCopy = JSON.parse(JSON.stringify(newNote))
        await props.addNote(user._id, room._id, noteCopy)
        const friend = user.friends.find(currFriend => currFriend.roomId === room._id)
        SocketService.emit("added note", ({ room, user, friendId: friend._id }));
        // props.showNotification('Note added successfully! So Excited', 'success')
        //Need to find way to transfer that prop on desktop
        setNoteHeader('')
        setNoteData('')
        setNoteType('')
        setIsUploading(false)
    }




    const checkIsValidUser = async () => { //FIX
        const { user, room } = props
        if (!user || !room) return
        let isValid = await RoomService.checkIsValidUser(user._id, room._id)
        isValid ? setIsValidUser(true) : props.history.push('/')
    }

    useEffect(() => {
        loadRoom()//created
        console.log(props.user);
        return () => { props.resetCurrRoom() }; //onDestroy
    }, []);

    // //watcher
    // useEffect(() => { 
    // FIX IS VAILD USER
    //     if (props.room) checkIsValidUser()
    // }, [props.room]);



    useEffect(() => {
        if ((noteData && noteType === 'NoteImg') ||
            noteType === 'NoteVideo') {
            onHandleSubmit()
        }
    }, [isUploading]);

    useEffect(() => {
        loadRoom()
    }, [props.filterBy]);





    return (
        <div className="room-page">
            {/* {(isValidUser && notes) ? <div className="note-add"> FIX IS VAILD USER*/}
            {notes ? <div className="note-add">
                {noteType && <InputType
                    isMarkerShown={true}
                    onUploadImg={onUploadImg}
                    addVideo={onAddVideo}
                    handleSubmit={onHandleSubmit}
                    setNoteHeader={setNoteHeader}
                    setNoteData={setNoteData}
                    noteData={noteData}
                />}
                <ButtonMenu setNoteType={setNoteType} setNoteInputType={setNoteInputType} setNoteData={setNoteData} />
            </div> : <Loading />}
            {/* {(isValidUser && notes) && <div> FIX IS VAILD USER */}
            {(notes && props.user) && <div>
                {
                    <NotesContainer room={props.room} user={props.user} setNoteType={setNoteType} filterBy={props.filterBy}/>
                }
            </div>}
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
        filterBy: state.room.filterBy,
        user: state.user.loggedinUser,
    };
};
const mapDispatchToProps = {
    loadRoomById,
    saveRoom,
    resetCurrRoom,
    updateUser,
    addNote
};
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);


