import React, { useState } from 'react';

import StarIcon from '../icons/StarIcon'
import CircleIcon from '../icons/CircleIcon'
import ColorPalleteIcon from '../icons/ColorPaletteIcon'

export default ({ togglePinned, note, user, setNoteColor }) => {
    const [isPalleteOpen, setIsPalleteOpen] = useState(false)


    const changeColor = (color) => {
        setNoteColor(color)
        setIsPalleteOpen(false)
    }


    return (
        <div className="features-container">
            <i onClick={() => togglePinned(note)}><StarIcon isPinned={user.pinnedNotes.find(id => id === note._id) ? true : false} /></i>
            <div className="color-pallete">
                {/* <img src={colorPallete} alt="Change Color" className="color-pallete-icon" onClick={() => setIsPalleteOpen(!isPalleteOpen)} /> */}
                <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>
                {isPalleteOpen && <div className="colors-container">
                    <i onClick={() => changeColor('#ffa350')}><CircleIcon fill="#ffa350" /></i>
                    <i onClick={() => changeColor('#f78888')}><CircleIcon fill="#f78888" /></i>
                    <i onClick={() => changeColor('#fff59d')}><CircleIcon fill="#fff59d" /></i>
                    <i onClick={() => changeColor('#90ccf4')}><CircleIcon fill="#90ccf4" /></i>
                    <i onClick={() => changeColor('#4caf50')}><CircleIcon fill="#4caf50" /></i>
                </div>}
            </div>
        </div>
    )
}
