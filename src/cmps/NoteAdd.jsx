import React, { useState, useEffect } from 'react';

import NoteInput from './NoteInput'
import SearchVideo from './SearchVideo'
import ButtonMenu from './ButtonMenu'

export default (props) => {
    const [noteData, setNoteData] = useState('');
    const [noteType, setNoteType] = useState('NoteText');

    const newNote = {
        data: noteData,
        type: noteType
    }

    useEffect(() => {
        // console.log(newNote);
    });


    return (
        <div className="note-add">
            {noteType !== 'NoteVideo' && <NoteInput setNoteData={setNoteData} />}
            {noteType === 'NoteVideo' && <SearchVideo />}

            {noteType === 'NoteVideo'
                ? <SearchVideo />
                : <NoteInput setNoteData={setNoteData} />
            }

            <SearchVideo />

            <ButtonMenu setNoteType={setNoteType} />
        </div>
    )
}