import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadRoomById } from '../actions/RoomActions';

import NoteAdd from '../cmps/NoteAdd'
import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/NoteList'



class BoardPage extends Component {
    state = {
        filterBy: { term: '', roomId: '' }
    }

    async componentDidMount() {
        this.loadRoom()
    }
    // loadNotes = async () => {
    //     await this.props.loadNotes(this.state.filterBy);
    // };

    loadRoom = async () => {
        const roomId = this.props.match.params.id;
        // this.setState(prevState => ({
        //     filterBy: {
        //         ...prevState.filterBy,
        //         roomId
        //     }
        // }))
        console.log('RoomID', roomId);

        await this.props.loadRoomById(roomId);
        console.log('room is', this.props.room);

    }

    // onFilterHandler = (filterBy) => {
    //     console.log('filter handler', filterBy);
    //     this.setState((prevState) => {
    //         // debugger
    //         return {
    //             filterBy: {
    //                 ...prevState.filterBy,
    //                 ...filterBy,
    //             },
    //         };
    //     }, this.loadContacts);
    // };

    render() {
        // const notes = [{ data: 'NOTE A', _id: '1', type: 'NoteText' }, { data: 'https://media.giphy.com/media/KeABNFoNacLf2/giphy.gif', _id: '2', type: 'NoteImg' }, { data: 'https://www.youtube.com/watch?v=aYDfwUJzYQg', _id: '3', type: 'NoteVideo' }]
        if (this.props.room) var { notes } = this.props.room //ASK BAR WHY CONST NOT WORKS INSTED OF VAR
        return (
            <div className="board-page">
                <NoteAdd />
                {notes && <div>
                    {!!notes.length && <NoteList notes={notes} />}
                </div>
                }
            </div>

        )
    }
}
// {
//     user && <div>
//         {!!user.notifications.length && <NotificationList notifications={user.notifications} onApprove={onApprove} onDecline={onDecline} ></NotificationList>}
//     </div>
// }
const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
    };
};

const mapDispatchToProps = {
    loadRoomById,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);