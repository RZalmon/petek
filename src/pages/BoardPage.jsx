// import React, { Component } from 'react'
// import { connect } from 'react-redux';

// import { loadRoomById, } from '../actions/RoomActions';

// import NoteAdd from '../cmps/NoteAdd'
// import ButtonMenu from '../cmps/ButtonMenu'
// import NoteList from '../cmps/NoteList'



// class BoardPage extends Component {
//     state = {
//         filterBy: { term: '', roomId: '' }
//     }

//     async componentDidMount() {
//         this.loadRoom()
//     }
//     // loadNotes = async () => {
//     //     await this.props.loadNotes(this.state.filterBy);
//     // };

//     loadRoom = async () => {
//         const roomId = this.props.match.params.id;
//         // this.setState(prevState => ({
//         //     filterBy: {
//         //         ...prevState.filterBy,
//         //         roomId
//         //     }
//         // }))

//         await this.props.loadRoomById(roomId);

//     }

//     // onFilterHandler = (filterBy) => {
//     //     console.log('filter handler', filterBy);
//     //     this.setState((prevState) => {
//     //         // debugger
//     //         return {
//     //             filterBy: {
//     //                 ...prevState.filterBy,
//     //                 ...filterBy,
//     //             },
//     //         };
//     //     }, this.loadContacts);
//     // };

//     render() {
//         // const notes = [{ data: 'NOTE A', _id: '1', type: 'NoteText' }, { data: 'https://media.giphy.com/media/KeABNFoNacLf2/giphy.gif', _id: '2', type: 'NoteImg' }, { data: 'https://www.youtube.com/watch?v=aYDfwUJzYQg', _id: '3', type: 'NoteVideo' }]
//         if (this.props.room) var { notes } = this.props.room //ASK BAR WHY CONST NOT WORKS INSTED OF VAR
//         return (
//             <div className="board-page">
//                 <NoteAdd />
//                 {notes && <div>
//                     {!!notes.length && <NoteList notes={notes} />}
//                 </div>
//                 }
//             </div>

//         )
//     }
// }

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
        props.saveRoom(JSON.parse(JSON.stringify(props.room)))
        setNoteData('')
        setNoteType('NoteText')
    }

    if (props.room) var { notes } = props.room

    useEffect(() => {
        if (!notes) loadRoom()
    });


    // loadRoom()

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