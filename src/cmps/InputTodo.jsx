import React from 'react'

export default (props) => {
    // const formattedVidLink = () => {
    //     return 'https://www.youtube.com/embed/' + note.data
    // }
    return (
        <div className="note-video">
            <iframe width="100%" allow="fullscreen" src={formattedVidLink()}></iframe>
        </div>
    )
}
