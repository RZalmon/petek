import React from 'react'
import NoteText from './Note/NoteText'
import NoteImg from './Note/NoteImg'
import NoteVideo from './Note/NoteVideo'
import NoteTodo from './Note/NoteTodo'


export default ({ note }) => {
    const cmps = {
        NoteText,
        NoteImg,
        NoteVideo,
        NoteTodo
    }
    const NoteType = cmps[note.type];
    return (
        <div className="note-preview">
            <NoteType note={note} />
        </div>
    )
}
