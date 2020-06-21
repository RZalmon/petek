import React from 'react'

export default ({ note }) => {
    return (
        <div className="note-text">
            {note.header && <h4>{note.header}</h4>}
            <p>{note.data}</p>
        </div>
    )
}
