import React from 'react'

export default ({ note }) => {
    const formattedVidLink = () => {
        return 'https://www.youtube.com/embed/' + note.data
    }
    return (
        <div className="note-video">
            {note.header && <h4>{note.header}</h4>}
            <iframe width="100%" allow="fullscreen" src={formattedVidLink()} title="Video Player"></iframe>
        </div>
    )
}
