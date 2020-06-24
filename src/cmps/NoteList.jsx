import React, {useEffect, useState} from 'react'
import NotePreview from './NotePreview'
import Loading from '../cmps/Loading'

export default ({ notes, user, removeNote, saveTodoEdit, togglePinned, isPinned }) => {
    
    const [notesForDisplay, setNotesForDisplay] = useState([])

    useEffect(() => {
        
        const fixedNotes = []
        notes.map(note =>{
            user.pinnedNotes.find(id =>{return id === note._id })  ? 
            fixedNotes.unshift(note) : fixedNotes.push(note)       
        })
     
        setNotesForDisplay(fixedNotes)
        }, [notes])

    return (
        
        <div className="note-list">
            {notesForDisplay.length ? notesForDisplay.map(note => {
                return (
                    <NotePreview note={note} key={note._id} user={user} removeNote={removeNote} saveTodoEdit={saveTodoEdit} togglePinned={togglePinned} isPinned={isPinned} />
                )
            }) : <Loading/>}
        </div>
    )
}
