import React, { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import NotePreview from './NotePreview'
import SpreadIcon from '../icons/SpreadIcon'
import ListIcon from '../icons/ListIcon'

export default ({ room, notes, user, removeNote, saveRoomChanges, togglePinned, setNoteType, toggleStarredNote, changeNoteColor, toggleNotePin, updateNote, updateMembers, isStarredPage }) => {
    const [isSpreadView, setIsSpreadView] = useState(false)

    const toggleView = () => {
        setIsSpreadView(!isSpreadView)
    }

    return (
        <div className="note-list">
            <i onClick={toggleView}>{isSpreadView ? <ListIcon /> : <SpreadIcon />}</i>
            <div className={isSpreadView ? 'spread-view' : 'chat-view'}>
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
                                toggleStarredNote={toggleStarredNote}
                                isStarredPage={isStarredPage}
                                isSpreadView={isSpreadView} />
                        </CSSTransition>)}
                </TransitionGroup>
            </div>
        </ div>
    )
}
