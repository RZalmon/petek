import React, {useEffect, useState} from 'react'
import NotePreview from './NotePreview'
import Loading from '../cmps/Loading'

export default ({ notes, userId, removeNote, saveTodoEdit, togglePinned, isPinned }) => {
    
    const [notesForDisplay, setNotesForDisplay] = useState([])

    useEffect(() => {
        
        const fixedNotes = []

        const unPinnedNotes = notes.filter(note =>{
            return !note.isPinned
        })
        
        const pinnedNotes = notes.filter(note =>{
            return note.isPinned
        })
        
        fixedNotes.push(...unPinnedNotes)
        fixedNotes.unshift(...pinnedNotes)
        setNotesForDisplay(fixedNotes)
        }, [notes])

    return (
        
        <div className="note-list">
            {notesForDisplay.length ? notesForDisplay.map(note => {
                return (
                    <NotePreview note={note} key={note._id} userId={userId} removeNote={removeNote} saveTodoEdit={saveTodoEdit} togglePinned={togglePinned} isPinned={isPinned} />
                )
            }) : <Loading/>}
        </div>
    )
}
