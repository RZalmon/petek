import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import NotePreview from './NotePreview'

export default ({ room, notes, user, removeNote, saveRoomChanges, togglePinned, setNoteType, toggleStarredNote, changeNoteColor, toggleNotePin, updateNote, updateMembers }) => {
console.log('notesnotesnotesnotesnotes',notes);
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

        <div className="note-list">
        {/* <div className="note-list" onClick={() => setNoteType('')}> */}
            <TransitionGroup component={null}>
                {notes.map((note) =>
                    <CSSTransition
                        key={note._id}
                        timeout={{ enter: 800, exit: 500 }}
                        classNames={'note-item'}
                    >
                        <NotePreview
                            room={room}
                            note={note}
                            key={note._id}
                            user={user}
                            saveRoomChanges={saveRoomChanges}
                            togglePinned={togglePinned}
                            removeNote={removeNote}
                            toggleNotePin={toggleNotePin}
                            changeNoteColor={changeNoteColor}
                            updateNote={updateNote}
                            updateMembers={updateMembers}
                            toggleStarredNote={toggleStarredNote}/>
                    </CSSTransition>)}
            </TransitionGroup>
        </div>
    )
}
