import React from 'react'

export default ({ note }) => {
    return (
        <div className="note-img">
            <img src={note.data} alt={note.data} />
        </div>
    )
}
