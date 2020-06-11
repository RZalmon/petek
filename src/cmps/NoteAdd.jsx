import React, { useState } from 'react';

import NoteInput from './NoteInput'
import ButtonMenu from './ButtonMenu'

export default (props) => {
    const [noteData, setNoteData] = useState('');

    const onChangeHandler = (data) => {
        setNoteData(data)
    }

    return (
        <div className="note-add">
            <NoteInput />
            <ButtonMenu />
        </div>
    )
}