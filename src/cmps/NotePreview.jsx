import React from 'react'
import NoteText from './Note/NoteText'
import NoteImg from './Note/NoteImg'
import NoteVideo from './Note/NoteVideo'
import NoteTodo from './Note/NoteTodo'


export default ({ note }) => {
    return (
        <div className="note-preview">
            <h2>{note.data}</h2>
        </div>
    )
}
