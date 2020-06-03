import React, { Component } from 'react'
import NoteList from '../cmps/NoteList'


import ButtonMenu from '../cmps/ButtonMenu'

export default class BoardPage extends Component {
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
