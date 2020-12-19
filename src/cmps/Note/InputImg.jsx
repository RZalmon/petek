import React, { createRef } from 'react';

import uploadImg from '../../assets/svg/upload.svg'

export default ({ setNoteHeader, onUploadImg }) => {

    const inputRef = createRef();


    const onUploadImgHandler = () => {
        inputRef.current.click()
    }

    return (
        <section className="input-img">
            <input className="input-header" placeholder="Img Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <input type="file" onChange={(ev) => onUploadImg(ev)} ref={inputRef} hidden />
            <img src={uploadImg} className="add-button" alt="Plus Icon" onClick={onUploadImgHandler} />
        </section >
    );
};

