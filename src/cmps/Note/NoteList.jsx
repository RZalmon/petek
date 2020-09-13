import React, { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import NotePreview from './NotePreview'

export default ({ notes, user, removeNote, saveRoomChanges, togglePinned, setNoteType,toggleStarred }) => {

    // const [notesForDisplay, setNotesForDisplay] = useState([])

    // useEffect(() => {
    //     const fixedNotes = []
    //     notes.map(note => {
    //         user.pinnedNotes.find(id => id === note._id) ?
    //             fixedNotes.unshift(note) : fixedNotes.push(note)
    //     })
    //     setNotesForDisplay(fixedNotes)
    // }, [notes])

    return (

        <div className="note-list" onClick={() => setNoteType('')}>
            <TransitionGroup component={null}>
                {notes.map((note) =>
                    <CSSTransition 
                    key={note._id}
                    timeout={{enter: 800, exit: 500}}
                    classNames={'note-item'}
                    >
                        <NotePreview
                            note={note}
                            key={note._id}
                            user={user}
                            removeNote={removeNote}
                            saveRoomChanges={saveRoomChanges}
                            togglePinned={togglePinned}
                            toggleStarred={toggleStarred} />
                    </CSSTransition>)}
            </TransitionGroup>
        </div>
    )
}
