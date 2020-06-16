import React, { useState, useEffect } from 'react';

import NoteInput from './NoteInput'
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
            <NoteInput setNoteData={setNoteData} />
            <ButtonMenu setNoteType={setNoteType} />
        </div>
    )
}