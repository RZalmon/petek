import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import NotePinIcon from '../icons/NotePinIcon'
import CircleIcon from '../icons/CircleIcon'
import ColorPalleteIcon from '../icons/ColorPaletteIcon'
import StarIcon from '../icons/StarIcon'

export default ({ note, user, toggleStarredNote, changeNoteColor, toggleNotePin, updateMembers, isStarredPage, roomId }) => {
    const [isPalleteOpen, setIsPalleteOpen] = useState(false)
    const [isStarred, setIsStarred] = useState(false)
    const colors = ['#ffa350', '#f78888', '#fff59d', '#90ccf4', '#4caf50']

    const checkIsStarred = () => {//We can make preformance better by removing from the array every starred we found 
        const ans = user.starredNotes.some(starredNote => starredNote.noteId === note._id)
        setIsStarred(ans)
    }


    const handleStarClicked = async () => {
        setIsStarred(!isStarred)
        await toggleStarredNote(user._id, roomId, note._id, isStarredPage)
    }

    const handleColorClicked = async (color) => {
        await changeNoteColor(roomId, note._id, color);
        setIsPalleteOpen(false)
        if (!isStarredPage) updateMembers();
    }


    useEffect(() => {
        checkIsStarred()
    }, [])



    return (
        <div className="features-container">
            <i onClick={handleStarClicked}><StarIcon isStarred={isStarred} /></i>
            {!isStarredPage && <i onClick={async () => { await toggleNotePin(roomId, note._id); updateMembers(); }}><NotePinIcon isPinned={note.isPinned} /></i>}
            <div className="color-pallete">
                <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>

                <TransitionGroup component={null} ><div className="colors-container">{
                    colors.map((color, idx) =>
                        (<CSSTransition
                            key={idx}
                            classNames="fade"
                            in={isPalleteOpen}
                            timeout={{ enter: 300, exit: 300 }}
                            unmountOnExit>
                            <i onClick={() => handleColorClicked(color)}><CircleIcon fill={color} /></i>
                        </CSSTransition>
                        )
                    )
                }
                </div></TransitionGroup>
            </div>
        </div >
    )
}



// import React, { useState, useEffect } from 'react';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

// import EmptyStarIcon from '../../assets/svg/empty-star.svg'

// import NotePinIcon from '../icons/NotePinIcon'
// import CircleIcon from '../icons/CircleIcon'
// import ColorPalleteIcon from '../icons/ColorPaletteIcon'
// import StarIcon from '../icons/StarIcon'

// export default ({ room, togglePinned, note, user, setNoteColor, toggleStarredNote, changeNoteColor, toggleNotePin, updateMembers, isStarredPage }) => {
//     const [isPalleteOpen, setIsPalleteOpen] = useState(false)
//     const [isStarred, setIsStarred] = useState(false)
//     const colors = ['#ffa350', '#f78888', '#fff59d', '#90ccf4', '#4caf50']


//     // const checkIsStarred = (note) => {
//     //     return !user.starredNotes ? setStarSrc(EmptyStarIcon) : user.starredNotes.find(starredNote => { return starredNote._id === note._id ? setStarSrc(StarIcon) : setStarSrc(EmptyStarIcon) })
//     // }

//     // const checkIsStarred = (note) => {
//     //     return user.starredNotes.some(starredNote => {
//     //         if (starredNote.noteId === 'aezVfVnkgap19GsM4jlPRbKM') console.log('&&&&starred:', starredNote.noteId, 'Note', note._id);
//     //         let ans = starredNote.noteId === note._id
//     //         console.log('&&&&ans:', ans);
//     //         return ans
//     //     })
//     // }


//     const checkIsStarred = () => {
//         const ans = user.starredNotes.some(starredNote => starredNote.noteId === note._id)
//         setIsStarred(ans)
//     }

//     const handleStarClicked = async () => {
//         let roomId = getRoomId();
//         await toggleStarredNote(user._id, roomId, note._id, isStarredPage)
//     }

//     const handleColorClicked = async (color) => {
//         let roomId = getRoomId();
//         await changeNoteColor(roomId, note._id, color);
//         setIsPalleteOpen(false)
//         if (!isStarredPage) updateMembers();
//     }

//     const getRoomId = () => {
//         return isStarredPage ? note.roomId : room._id
//     }


//     // useEffect(() => {
//     //     checkIsStarred()
//     // }, [])



//     return (
//         <div className="features-container">
//             <h1>{checkIsStarred(note)}</h1>
//             <i onClick={handleStarClicked}><StarIcon isStarred={isStarred} /></i>
//             {!isStarredPage && <i onClick={async () => { await toggleNotePin(room._id, note._id); updateMembers(); }}><NotePinIcon isPinned={note.isPinned} /></i>}
//             <div className="color-pallete">
//                 <i onClick={() => setIsPalleteOpen(!isPalleteOpen)}><ColorPalleteIcon /></i>

//                 <TransitionGroup component={null} ><div className="colors-container">{
//                     colors.map((color, idx) =>
//                         (<CSSTransition
//                             key={idx}
//                             classNames="fade"
//                             in={isPalleteOpen}
//                             timeout={{ enter: 300, exit: 300 }}
//                             unmountOnExit>
//                             <i onClick={() => handleColorClicked(color)}><CircleIcon fill={color} /></i>
//                         </CSSTransition>
//                         )
//                     )
//                 }
//                 </div></TransitionGroup>
//             </div>
//         </div >
//     )
// }

