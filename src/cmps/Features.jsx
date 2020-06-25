import React, { useState, useEffect } from 'react';
import emptyStar from '../assets/svg/empty-star.svg'
import star from '../assets/svg/star.svg'
import colorPallete from '../assets/svg/paint.svg'
import splashOrange from '../assets/svg/splash-orange.svg'
import splashPink from '../assets/svg/splash-pink.svg'
import splashYellow from '../assets/svg/splash-yellow.svg'
import splashBlue from '../assets/svg/splash-blue.svg'
import splashGreen from '../assets/svg/splash-green.svg'

export default ({ togglePinned, note, user, setNoteColor }) => {
    const [isPalleteOpen, setIsPalleteOpen] = useState(false)

    useEffect(() => {

    }, [note])

    return (
        <div className="features-container">
            <img src={user.pinnedNotes.find(id => { return id === note._id }) ? star : emptyStar} alt="star" onClick={() => togglePinned(note)} />
            <div className="color-pallete">
                <img src={colorPallete} alt="Change Color" onClick={() => setIsPalleteOpen(!isPalleteOpen)} />
                {isPalleteOpen && <div className="colors-container">
                    <img src={splashOrange} className="color1" onClick={() => setNoteColor('#ffa350')} />
                    <img src={splashPink} className="color2" onClick={() => setNoteColor('#f78888')} />
                    <img src={splashYellow} className="color3" onClick={() => setNoteColor('#f3d250')} />
                    <img src={splashBlue} className="color4" onClick={() => setNoteColor('#90ccf4')} />
                    <img src={splashGreen} className="color5" onClick={() => setNoteColor('#4caf50')} />
                </div>}
            </div>
        </div>
    )
}
//save button is a temp solution to onSubmit with enter key