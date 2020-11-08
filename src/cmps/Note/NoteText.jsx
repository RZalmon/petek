import React from 'react'

import LongText from '../LongText'

export default ({ note, isEdit, textEdit, setTextEdit }) => {
    return (
        <div className="note-text">
            {note.header && <h4>{note.header}</h4>}
            {isEdit
                ? <input type="text" onChange={(e) => setTextEdit(e.target.value)} />
                : <LongText text={note.data} limit={25} />}
        </div>
    )
}

// export default ({ note, isEdit, textEdit, setTextEdit }) => {

//     return (
//         <div className="note-text">
//             {note.header && <h4>{note.header}</h4>}
//             {isEdit
//                 ? <input type="text" onChange={(e) => setTextEdit(e.target.value)} />
//                 : <p>{note.data}</p>}
//         </div>
//     )
// }


//Trying to animate the switch between edit and text. the problem is that altough its not edit mode 
// the input is shown. after the first time we switch isEdit the problem is fixed.import React, { useState } from 'react'
// import { CSSTransition } from 'react-transition-group';

// export default ({ note, isEdit, textEdit, setTextEdit, isNotEdit }) => {

//     return (
//         <div className="note-text">
//             {note.header && <h4>{note.header}</h4>}
//             {/* {isEdit
//                 ? <input type="text" onChange={(e) => setTextEdit(e.target.value)} />
//                 : <p>{note.data}</p>} */}
//             <CSSTransition
//                 classNames={'fade'}
//                 timeout={300}
//                 in={isEdit}>
//                 <input type="text" onChange={(e) => setTextEdit(e.target.value)} />
//             </CSSTransition>
//             <CSSTransition
//                 classNames={'fade'}
//                 timeout={300}
//                 in={isNotEdit}>
//                 <p>{note.data}</p>
//             </CSSTransition>
//             {isEdit ? <h1>true</h1> : <h1>false</h1>}
//         </div>
//     )
// }

