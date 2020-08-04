import React, { useEffect, useState } from 'react'
import NotePreview from './NotePreview'
import Loading from '../Loading'

export default ({ notes, user, removeNote, saveRoomChanges, togglePinned, setNoteType }) => {

    const [notesForDisplay, setNotesForDisplay] = useState([])

    useEffect(() => {
        const fixedNotes = []
        notes.map(note => {
            user.pinnedNotes.find(id => id === note._id) ?
                fixedNotes.unshift(note) : fixedNotes.push(note)
        })
        setNotesForDisplay(fixedNotes)
    }, [notes])

    return (

        <div className="note-list" onClick={() => setNoteType('')}>
            {notesForDisplay.length ? notesForDisplay.map(note => {
                return (
                    <NotePreview
                     note={note} 
                     key={note._id} 
                     user={user} 
                     removeNote={removeNote} 
                     saveRoomChanges={saveRoomChanges} 
                     togglePinned={togglePinned} />
                )
            }) : <Loading />}
        </div>
    )
}
