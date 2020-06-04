import React from 'react'

export default ({ note }) => {
    return (
        <div className="note-img">
            <p>Hello {note.type}</p>
        </div>
    )
}
