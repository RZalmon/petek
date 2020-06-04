import React from 'react'

export default ({ note }) => {
    return (
        <div className="note-todo">
            <p>Hello {note.type}</p>
        </div>
    )
}
