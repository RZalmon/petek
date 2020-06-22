import React, { createRef } from 'react';

import PlusIcon from '../assets/svg/plus.svg'

export default ({ setNoteHeader, onUploadImg }) => {

    const inputRef = createRef();


    const onUploadImgHandler = () => {
        inputRef.current.click()
        // setNoteType('NoteImg');
    }

    return (
        <section className="input-video">
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <input type="file" onChange={(ev) => { onUploadImg(ev); }} ref={inputRef} hidden />
            <img src={PlusIcon} className="add-button" alt="Plus Icon" onClick={() => { onUploadImgHandler() }} />
        </section >
    );
};

