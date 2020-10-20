import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import SocketService from '../../services/SocketService'

import { loadRoomById, saveRoom, resetCurrRoom } from '../../actions/RoomActions';
import { toggleStarredNote, removeNote, changeNoteColor, toggleNotePin, updateNote } from '../../actions/NoteActions'

import NoteFilter from './NoteFilter'
import NoteList from './NoteList'



const NotesContainer = ({ room, user, setNoteType, removeNote, saveRoom, changeNoteColor, toggleNotePin, updateNote, toggleStarredNote }) => {
    const [filterBy, setFilterBy] = useState({
        term: '',
        type: '',
        by: 'all'
    });

    if (room) var { notes } = room


    const onFilterHandler = (filterBy) => {
        setFilterBy(filterBy)
    };

    const saveRoomChanges = async () => {
        await saveRoom(room)
        SocketService.emit("roomUpdated", { room, userId: user._id });
    }



    const updateMembers = () => {
        if (room.members.length > 1) SocketService.emit("roomUpdated", { room, userId: user._id });
    }


    return (
        <div className="notes-container">
            <NoteFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                onFilter={onFilterHandler}
                placeHolder={"Search for notes"} />


            <NoteList
                room={room}
                notes={notes}
                user={user}
                removeNote={removeNote}
                changeNoteColor={changeNoteColor}
                toggleNotePin={toggleNotePin}
                saveRoomChanges={saveRoomChanges}
                setNoteType={setNoteType}
                updateNote={updateNote}
                updateMembers={updateMembers}
                toggleStarredNote={toggleStarredNote}
            // togglePinned={togglePinned}
            // setNoteType={setNoteType}
            // toggleStarred={toggleStarred}
            />


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // room: state.room.currRoom,
        // user: state.user.loggedinUser,
    };
};

const mapDispatchToProps = {
    toggleNotePin,
    changeNoteColor,
    removeNote,
    saveRoom,
    loadRoomById,
    resetCurrRoom,
    updateNote,
    toggleStarredNote
};


export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
