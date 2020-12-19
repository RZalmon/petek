import React from 'react';
import SaveIcon from '../icons/SaveIcon';
import CancelIcon from '../icons/CancelIcon';

export default ({ setNoteData, setNoteHeader, handleSubmit, resetNoteAdd }) => {



    return (
        <div className="input-text">
            <i className="cancel-wrapper" onClick={resetNoteAdd}><CancelIcon /></i>
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <textarea className="input-data" placeholder="Say Something" type="text" onChange={e => setNoteData(e.target.value)} />
            <i onClick={handleSubmit}><SaveIcon /></i>
        </div>
    )
}
//save button is a temp solution to onSubmit with enter key