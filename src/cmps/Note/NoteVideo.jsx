import React from 'react'

export default ({ note }) => {
    const formattedVidLink = () => {
        let url = note.data
        const vidId = url.substring(url.length - 11, url.length)
        return 'https://www.youtube.com/embed/' + vidId
    }
    // const lastNameSelector = (user) => user.firstName + ' ' user.lastName

    // formattedVidLink() {
    //     let url = this.note.info.url
    //     const vidId = url.substring(url.length - 11, url.length)
    //     return 'https://www.youtube.com/embed/' + vidId
    // }
    console.log(formattedVidLink());
    
    return (
        <div className="note-video">
            <iframe width="100%" src={formattedVidLink()}></iframe>
        </div>
    )
}
