import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { UtilService } from '../services/UtilService'

import { loadRoomById, saveRoom } from '../actions/RoomActions';

import NoteInput from '../cmps/NoteInput'
import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/NoteList'

const BoardPage = (props) => {
    const [noteData, setNoteData] = useState('');
    const [noteType, setNoteType] = useState('NoteText');

    const newNote = {
        data: noteData,
        type: noteType
    }


    const loadRoom = async () => {
        const roomId = props.match.params.id;
        await props.loadRoomById(roomId);
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault();
        props.room.notes.unshift(newNote)
        newNote._id = UtilService.makeId(24)
        newNote.createdAt = Date.now()
        props.saveRoom(JSON.parse(JSON.stringify(props.room)))
        setNoteData('')
        setNoteType('NoteText')
    }

    if (props.room) var { notes } = props.room

    useEffect(() => {
        if (!notes) loadRoom()
    });

    return (
        <div className="board-page">
            <div className="note-add">
                <NoteInput setNoteData={setNoteData} handleSubmit={onHandleSubmit} />
                <ButtonMenu setNoteType={setNoteType} />
            </div>
            {notes && <div>
                {!!notes.length && <NoteList notes={notes} />}
            </div>}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
    };
};

const mapDispatchToProps = {
    loadRoomById,
    saveRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);