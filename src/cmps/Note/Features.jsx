import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import StarIcon from '../icons/StarIcon'
import CircleIcon from '../icons/CircleIcon'
import ColorPalleteIcon from '../icons/ColorPaletteIcon'

export default ({ togglePinned, note, user, setNoteColor }) => {
    const [isPalleteOpen, setIsPalleteOpen] = useState(false)


    const changeColor = (color) => {
        setNoteColor(color)
        setIsPalleteOpen(false)
    }

    const colors = ['#ffa350', '#f78888', '#fff59d', '#90ccf4', '#4caf50']

    return (
        <div className="features-container">
            <i onClick={() => togglePinned(note)}><StarIcon isPinned={user.pinnedNotes.find(id => id === note._id) ? true : false} /></i>
            <div className="color-pallete">
                {/* <img src={colorPallete} alt="Change Color" className="color-pallete-icon" onClick={() => setIsPalleteOpen(!isPalleteOpen)} /> */}
                <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>

                {isPalleteOpen && <div className="colors-container">{
                    colors.map((color, idx) => {
                        return (<CSSTransition
                            key={idx}
                            classNames="fade"
                            timeout={300}
                            in={true}
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



//second try after looking in doc https://github.com/reactjs/react-transition-group/blob/master/Migration.md
// return (
//     <div className="features-container">
//         <i onClick={() => togglePinned(note)}><StarIcon isPinned={user.pinnedNotes.find(id => id === note._id) ? true : false} /></i>
//         <div className="color-pallete">
//             {/* <img src={colorPallete} alt="Change Color" className="color-pallete-icon" onClick={() => setIsPalleteOpen(!isPalleteOpen)} /> */}
//             <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>

//             {isPalleteOpen && <div className="colors-container">{
//                 colors.map((color, idx) => {
//                     return (<CSSTransition
//                         key={idx}
//                         classNames="example"
//                         timeout={{ enter: 500, exit: 300 }}>
//                         <i onClick={() => changeColor(color)}><CircleIcon fill={color} /></i>
//                     </CSSTransition>
//                     )
//                 })
//             }
//             </div>}
//         </div>
//     </div >
// )
// }



//before started with animations
// import React, { useState } from 'react';
// import ReactCSSTransitionGroup from 'react-transition-group';

// import StarIcon from '../icons/StarIcon'
// import CircleIcon from '../icons/CircleIcon'
// import ColorPalleteIcon from '../icons/ColorPaletteIcon'

// export default ({ togglePinned, note, user, setNoteColor }) => {
//     const [isPalleteOpen, setIsPalleteOpen] = useState(false)


//     const changeColor = (color) => {
//         setNoteColor(color)
//         setIsPalleteOpen(false)
//     }


//     return (
//         <div className="features-container">
//             <i onClick={() => togglePinned(note)}><StarIcon isPinned={user.pinnedNotes.find(id => id === note._id) ? true : false} /></i>
//             <div className="color-pallete">
//                 {/* <img src={colorPallete} alt="Change Color" className="color-pallete-icon" onClick={() => setIsPalleteOpen(!isPalleteOpen)} /> */}
//                 <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>
//                 {isPalleteOpen && <div className="colors-container">
//                     <i onClick={() => changeColor('#ffa350')}><CircleIcon fill="#ffa350" /></i>
//                     <i onClick={() => changeColor('#f78888')}><CircleIcon fill="#f78888" /></i>
//                     <i onClick={() => changeColor('#fff59d')}><CircleIcon fill="#fff59d" /></i>
//                     <i onClick={() => changeColor('#90ccf4')}><CircleIcon fill="#90ccf4" /></i>
//                     <i onClick={() => changeColor('#4caf50')}><CircleIcon fill="#4caf50" /></i>
//                 </div>}
//             </div>
//         </div>
//     )
// }
