import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadNotes } from '../actions/NoteActions';

import ButtonMenu from '../cmps/ButtonMenu'
import NoteList from '../cmps/NoteList'



class BoardPage extends Component {
    state = {
        filterBy: { term: '' }
    }
    
    loadNotes = async () => {
        await this.props.loadNotes(this.state.filterBy);
    };


    render() {
        const notes = [{ data: 'NOTE A', _id: '1', type: 'NoteText' }, { data: 'NOTE B', _id: '2', type: 'NoteText' }, { data: 'NOTE C', _id: '3', type: 'NoteText' }]
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