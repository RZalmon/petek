import React from 'react'

export default ({ note }) => {
    return (
        <div className="note-img">
            {note.header && <h4>{note.header}</h4>}
            <img src={note.data} alt={note.data} />
        </div>
    )
}
