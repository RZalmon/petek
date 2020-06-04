import React from 'react'

export default ({ note }) => {
    return (
        <div className="note-text">
            <p>{note.data}</p>
        </div>
    )
}
