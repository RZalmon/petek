import React, { useState,useEffect  } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import StarIcon from '../../assets/svg/star.svg'
import EmptyStarIcon from '../../assets/svg/empty-star.svg'

import NotePinIcon from '../icons/NotePinIcon'
import CircleIcon from '../icons/CircleIcon'
import ColorPalleteIcon from '../icons/ColorPaletteIcon'

export default ({ togglePinned, note, user, setNoteColor,toggleStarred }) => {
    const [isPalleteOpen, setIsPalleteOpen] = useState(false)
    const [starSrc, setStarSrc] = useState(EmptyStarIcon)
    
    const colors = ['#ffa350', '#f78888', '#fff59d', '#90ccf4', '#4caf50']


    const changeColor = (color) => {
        setNoteColor(color)
        setIsPalleteOpen(false)
    }

    const checkIsStarred = (note) => {
      return !user.starredNotes ? setStarSrc(EmptyStarIcon) : user.starredNotes.find(starredNote =>{return starredNote._id === note._id ? setStarSrc(StarIcon) : setStarSrc(EmptyStarIcon)  })
    }

    useEffect(() => {
        checkIsStarred(note)
        console.log('hiiiiiiiiiii');
    }, [])


    return (
        <div className="features-container">
            <i onClick={() => toggleStarred(note)}><img src={starSrc} alt=""/></i>
            <i onClick={() => togglePinned(note)}><NotePinIcon isPinned={note.isPinned} /></i>
            <div className="color-pallete">
                <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>

                {isPalleteOpen && <div className="colors-container">{
                    colors.map((color, idx) => {
                        return (<CSSTransition
                            key={idx}
                            classNames={'fade'}
                            timeout={300}
                            in={isPalleteOpen}
                            appear={true}>
                            <i onClick={() => changeColor(color)}><CircleIcon fill={color} /></i>
                        </CSSTransition>
                        )
                    })
                }
                </div>}
            </div>
        </div >
    )
}



//***TRIED HERE WITH THE "PROPER WAY" USING TRANSITION GROUP BUT WE STILL CAN SEE THE PALLATE OPEN ALTOUGH IN STATE ITS FALSE  **** */
// import React, { useState } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import NotePinIcon from '../icons/NotePinIcon'
// import CircleIcon from '../icons/CircleIcon'
// import ColorPalleteIcon from '../icons/ColorPaletteIcon'

// export default ({ togglePinned, note, user, setNoteColor }) => {
//     const [isPalleteOpen, setIsPalleteOpen] = useState(false)
//     const colors = ['#ffa350', '#f78888', '#fff59d', '#90ccf4', '#4caf50']


//     const changeColor = (color) => {
//         setNoteColor(color)
//         setIsPalleteOpen(false)
//     }


//     return (
//         <div className="features-container">
//             <i onClick={() => togglePinned(note)}><NotePinIcon isPinned={note.isPinned} /></i>
//             <div className="color-pallete">
//                 <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>

//                 <TransitionGroup component={null}><div className="colors-container">{
//                     colors.map((color, idx) =>
//                         (<CSSTransition
//                             key={idx}
//                             classNames="fade"
//                             in={isPalleteOpen}
//                             timeout={{enter: 800, exit: 500}}>
//                             <i onClick={() => changeColor(color)}><CircleIcon fill={color} /></i>
//                         </CSSTransition>
//                         )
//                     )
//                 }
//                 </div></TransitionGroup>
//             </div>
//         </div >
//     )
// }

