import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import SocketService from '../../services/SocketService'

import { loadRoomById, saveRoom, resetCurrRoom } from '../../actions/RoomActions';
import { toggleStarredNote, removeNote, changeNoteColor, toggleNotePin, updateNote } from '../../actions/NoteActions'

import NoteFilter from './NoteFilter'
import NoteList from './NoteList'


const StarredContainer = ({ room,notes, user, setNoteType, removeNote, saveRoom, changeNoteColor, toggleNotePin, updateNote, toggleStarredNote, isStarredPage}) => {



    return (
        <div className="starred-container">
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
                isStarredPage={isStarredPage}
                toggleStarredNote={toggleStarredNote}
                isStarredPage={isStarredPage}
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
    updateNote,
    toggleStarredNote
};


export default connect(mapStateToProps, mapDispatchToProps)(StarredContainer);
