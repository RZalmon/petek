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
import InputText from '../cmps/Note/InputText'
import InputImg from '../cmps/Note/InputImg'
import InputVideo from '../cmps/Note/InputVideo'
import InputTodo from '../cmps/Note/InputTodo'
import InputLoc from '../cmps/Note/InputLoc'
import { UserService } from '../services/UserService';
import { RoomService } from '../services/RoomService';


const BoardPage = (props) => {
    const [noteType, setNoteType] = useState('');
    const [noteHeader, setNoteHeader] = useState('');
    const [noteData, setNoteData] = useState('');
    const [noteInputType, setNoteInputType] = useState('InputText');
    const [isUploading, setIsUploading] = useState(false);
    const [filterBy, setFilterBy] = useState('');
    const [isValidUser, setIsValidUser] = useState(null)
    if (props.room) var { notes } = props.room
    const newNote = {
        header: noteHeader,
        data: noteData,
        type: noteType
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
            checkIsValidUser()
            await props.loadRoomById({ term: filterBy.term, roomId })
            return
        }
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
    // const onAddLoc = (loc) => {
    //     setNoteData(loc)
    //     setIsUploading(true)
    // }
    const onFilterHandler = (filterBy) => {
        setFilterBy(filterBy)
    };
    const onHandleSubmit = async (ev) => {
        const { user } = props
        if (ev) ev.preventDefault()
        newNote._id = UtilService.makeId(24)
        newNote.createdAt = Date.now()    //maybe server side should handle it
        let minimalUser = UserService.getMinimalUser(user._id, user.imgUrl)
        newNote.createdBy = minimalUser
        const friend = user.friends.find(currFriend => currFriend.roomId === !props.room._id ? props.match.params.id : props.room._id)
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
    const checkIsValidUser = async () => {
        const { user, room } = props
        let isValid = await RoomService.checkIsValidUser(user._id, room._id)
        isValid ? setIsValidUser(true) : props.history.push('/')
    }

    useEffect(() => {
        loadRoom()//created
        return () => { props.resetCurrRoom() }; //onDestroy
    }, []);

    //watcher
    useEffect(() => {
        if (props.room) checkIsValidUser()
    }, [props.room]);

    
    useEffect(() => {
        if ((noteData && noteType === 'NoteImg') ||
            noteType === 'NoteVideo') {
            onHandleSubmit()
        }
    }, [isUploading]);

    useEffect(() => {
        console.log(filterBy.term);
        loadRoom()
    }, [filterBy]);





    return (
        <div className="board-page">
            {(isValidUser && notes) ? <div className="note-add">
                <Filter
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                    onFilter={onFilterHandler}
                    placeHolder={"Search for notes"} />
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
            {(isValidUser && notes) && <div>
                {!!notes.length && <NoteList notes={notes} user={props.user} removeNote={removeNote} saveRoomChanges={saveRoomChanges} togglePinned={togglePinned} setNoteType={setNoteType} />}
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
    updateUser
};
export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);