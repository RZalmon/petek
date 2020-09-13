import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { UtilService } from '../services/UtilService'
import SocketService from '../services/SocketService'
import CloudinaryService from '../../src/services/CloudinaryService'
import { loadRoomById, saveRoom, resetCurrRoom } from '../actions/RoomActions';
import { updateUser } from '../actions/UserActions';
import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/Note/NoteList'
import NoteFilter from '../cmps/Note/NoteFilter'
import Loading from '../cmps/Loading'
import InputText from '../cmps/Note/InputText'
import InputImg from '../cmps/Note/InputImg'
import InputVideo from '../cmps/Note/InputVideo'
import InputTodo from '../cmps/Note/InputTodo'
import InputLoc from '../cmps/Note/InputLoc'
import { UserService } from '../services/UserService';
import { RoomService } from '../services/RoomService';


const RoomPage = (props) => {
    const [noteType, setNoteType] = useState('');
    const [noteHeader, setNoteHeader] = useState('');
    const [noteData, setNoteData] = useState('');
    const [noteInputType, setNoteInputType] = useState('InputText');
    const [isUploading, setIsUploading] = useState(false);
    const [isValidUser, setIsValidUser] = useState(null)
    const [filterBy, setFilterBy] = useState({
        term: '',
        type: '',
        by: 'all'
    });

    if (props.room) var { notes } = props.room

    const newNote = {
        header: noteHeader,
        data: noteData,
        type: noteType,
        bgColor: '#87cefa',
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
            await props.loadRoomById({ ...filterBy, roomId })
            checkIsValidUser()
            return
        }
        await props.loadRoomById({ ...filterBy, roomId })
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
        setFilterBy(filterBy)
    };

    const onHandleSubmit = async (ev) => {
        const { user, room } = props
        if (ev) ev.preventDefault()
        newNote._id = UtilService.makeId(24)
        newNote.createdAt = Date.now()    //maybe server side should handle it
        let minimalUser = UserService.getMinimalUser(user._id, user.imgUrl)
        newNote.createdBy = minimalUser
        const friend = user.friends.find(currFriend => currFriend.roomId === room._id)
        let idx = room.notes.findIndex(note => !note.isPinned)
        room.notes.splice(idx, 0, newNote)
        props.saveRoom(JSON.parse(JSON.stringify(room)))
        SocketService.emit("added note", ({ room, user, friendId: friend._id }));
        // props.showNotification('Note added successfully! So Excited', 'success')
        //Need to find way to transfer that prop on desktop
        setNoteHeader('')
        setNoteData('')
        setNoteType('')
        setIsUploading(false)
    }

    const togglePinned = async (note) => {
        note.isPinned = !note.isPinned
        let idx = props.room.notes.findIndex(currNote => note._id === currNote._id)
        props.room.notes.splice(idx, 1)
        note.isPinned ? handleNotePin(note) : handleNoteUnpin(note)
        await props.saveRoom(JSON.parse(JSON.stringify(props.room)))
        SocketService.emit("roomUpdated", { room: props.room, userId: props.user._id });
    }
    const toggleStarred = async (note) => {
        props.user.starredNotes ? handleStarredNote(note) : props.user.starredNotes = new Array(note)
        
        // note.isPinned = !note.isPinned
        // let idx = props.room.notes.findIndex(currNote => note._id === currNote._id)
        // props.room.notes.splice(idx, 1)
        // note.isPinned ? handleNotePin(note) : handleNoteUnpin(note)
        // await props.saveRoom(JSON.parse(JSON.stringify(props.room)))
        // SocketService.emit("roomUpdated", { room: props.room, userId: props.user._id });
    }
    
    const handleStarredNote = (note) =>{
        let idx =  props.user.starredNotes.findIndex(starredNote => starredNote._id === note._id)
        idx === -1 ? props.user.starredNotes.unshift(note) : props.user.starredNotes.splice(idx, 1)
        console.log(idx);
        console.log(props.user);
        props.updateUser(props.user)


        // props.user.starredNotes.find(srarredNote => srarredNote)
    }


    const handleNotePin = (note) => {
        props.room.notes.unshift(note)
    }

    const handleNoteUnpin = (note) => {
        let idx = props.room.notes.findIndex(currNote => (!currNote.isPinned && currNote.createdAt <= note.createdAt))
        idx === -1 ? props.room.notes.push(note) : props.room.notes.splice(idx, 0, note)
    }

    const removeNote = async (noteId) => {
        let idx = props.room.notes.findIndex(note => note._id === noteId)
        props.room.notes.splice(idx, 1)
        await props.saveRoom(props.room)
        SocketService.emit("roomUpdated", { room: props.room, userId: props.user._id });
        // props.showNotification('Note Deleted successfully!', 'error')
        //Need to find way to transfer that prop on desktop
    }
    
    const checkIsValidUser = async () => {
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
        loadRoom()
    }, [filterBy]);





    return (
        <div className="room-page">

            {(isValidUser && notes) ? <div className="note-add">
                <NoteFilter
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
                {!!notes.length && <NoteList notes={notes} user={props.user} removeNote={removeNote} saveRoomChanges={saveRoomChanges} togglePinned={togglePinned} setNoteType={setNoteType} toggleStarred={toggleStarred} />}
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
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
