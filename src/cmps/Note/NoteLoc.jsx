import React from 'react'

export default ({ note }) => {
    return (
        <div className="note-loc">
            {note.header && <h4>{note.header}</h4>}
            <p>IM NOTE LOC YOU FUCKER</p>
        </div>
    )
}
