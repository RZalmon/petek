import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadNotes } from '../actions/NoteActions';

import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/NoteList'



class BoardPage extends Component {
    state = {
        filterBy: { term: '', boardId: '' }
    }

    async componentDidMount() {
        this.loadNotes()
    }
    // loadNotes = async () => {
    //     await this.props.loadNotes(this.state.filterBy);
    // };

    loadNotes = async () => {
        const boardId = this.props.match.params.id;
        this.setState(prevState => ({
            filterBy: {
                ...prevState.filterBy,
                boardId
            }
        }))
        await this.props.loadNotes(this.state.filterBy);;
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
        const notes = [{ data: 'NOTE A', _id: '1', type: 'NoteText' }, { data: 'https://media.giphy.com/media/KeABNFoNacLf2/giphy.gif', _id: '2', type: 'NoteImg' }, { data: 'https://www.youtube.com/watch?v=aYDfwUJzYQg', _id: '3', type: 'NoteVideo' }]
        return (
            <div className="board-page">
                <h1>Hello Board Page</h1>
                <ButtonMenu></ButtonMenu>
                {notes.length && <NoteList notes={notes} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.note.notes,
    };
};

const mapDispatchToProps = {
    loadNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);