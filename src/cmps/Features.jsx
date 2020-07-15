import React, { useState, useEffect } from 'react';
// import emptyStar from '../assets/svg/empty-star.svg'
// import star from '../assets/svg/star.svg'
import colorPallete from '../assets/svg/paint.svg'
import splashOrange from '../assets/svg/splash-orange.svg'
import splashPink from '../assets/svg/splash-pink.svg'
import splashYellow from '../assets/svg/splash-yellow.svg'
import splashBlue from '../assets/svg/splash-blue.svg'
import splashGreen from '../assets/svg/splash-green.svg'

import StarIcon from './icons/StarIcon'
import SplashIcon from './icons/SplashIcon'

export default ({ togglePinned, note, user, setNoteColor }) => {
    const [isPalleteOpen, setIsPalleteOpen] = useState(false)

    useEffect(() => {

    }, [note])

    return (
        <div className="features-container">
            {/* <img className="pin-btn" src={user.pinnedNotes.find(id => { return id === note._id }) ? star : emptyStar} alt="Pin Note" onClick={() => togglePinned(note)} /> */}
            <i onClick={() => togglePinned(note)}><StarIcon isPinned={user.pinnedNotes.find(id => id === note._id) ? true : false} /></i>
            <div className="color-pallete">
                <img src={colorPallete} alt="Change Color" className="color-pallete-icon" onClick={() => setIsPalleteOpen(!isPalleteOpen)} />
                {isPalleteOpen && <div className="colors-container">
                    {/* <img src={splashOrange} className="color1" onClick={() => { setNoteColor('#ffa350'); setIsPalleteOpen(false) }} />
                    <img src={splashPink} className="color2" onClick={() => { setNoteColor('#f78888'); setIsPalleteOpen(false) }} />
                    <img src={splashYellow} className="color3" onClick={() => { setNoteColor('#fff59d'); setIsPalleteOpen(false) }} />
                    <img src={splashBlue} className="color4" onClick={() => { setNoteColor('#90ccf4'); setIsPalleteOpen(false) }} />
                    <img src={splashGreen} className="color5" onClick={() => { setNoteColor('#4caf50'); setIsPalleteOpen(false) }} /> */}
                    <i><SplashIcon /></i>
                </div>}
            </div>
        </div>
    )
}
