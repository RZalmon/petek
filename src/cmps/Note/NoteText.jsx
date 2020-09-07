import React, { useState } from 'react'

export default ({ note, isEdit, textEdit, setTextEdit }) => {

    return (
        <div className="note-text">
            {note.header && <h4>{note.header}</h4>}
            {isEdit
                ? <input type="text" onChange={(e) => setTextEdit(e.target.value)} />
                : <p>{note.data}</p>}
        </div>
    )
}
