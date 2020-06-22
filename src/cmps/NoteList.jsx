import React from 'react'
import NotePreview from './NotePreview'

export default ({ notes, userId, removeNote }) => {
    return (
        <div className="note-list">
            {notes.map(note => {
                return (
                    <NotePreview note={note} key={note._id} userId={userId} removeNote={removeNote}/>
                )
            })}
        </div>
    )
}
