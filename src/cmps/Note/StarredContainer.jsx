import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import SocketService from '../../services/SocketService'

import { loadRoomById, saveRoom, resetCurrRoom, removeNote, changeNoteColor, toggleNotePin, updateNote } from '../../actions/RoomActions';

import NoteFilter from './NoteFilter'
import NoteList from './NoteList'


import { UserService } from '../../services/UserService';
import { RoomService } from '../../services/RoomService';


const StarredContainer = ({ room,notes, user, setNoteType, removeNote, saveRoom, changeNoteColor, toggleNotePin, updateNote }) => {
    const [filterBy, setFilterBy] = useState({
        term: '',
        type: '',
        by: 'all'
    });



    const onFilterHandler = (filterBy) => {
        setFilterBy(filterBy)
    };

    return (
        <div className="starred-container">
            <h1>Container</h1>
            {/* <NoteFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                onFilter={onFilterHandler}
                placeHolder={"Search for notes"} /> */}


            <NoteList
                room={room}
                notes={notes}
                user={user}
                removeNote={removeNote}
                changeNoteColor={changeNoteColor}
                toggleNotePin={toggleNotePin}
                // saveRoomChanges={saveRoomChanges}
                // setNoteType={setNoteType}
                updateNote={updateNote}
                // updateMembers={updateMembers}
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
    updateNote
};


export default connect(mapStateToProps, mapDispatchToProps)(StarredContainer);
