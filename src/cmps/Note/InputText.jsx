import React from 'react';
import SaveIcon from '../icons/SaveIcon'

export default ({ setNoteData, setNoteHeader, handleSubmit }) => {


    return (
        <form className="input-text" onSubmit={handleSubmit}>
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <input className="input-data" placeholder="Say Something" type="text" onChange={e => setNoteData(e.target.value)} />
            <button><SaveIcon/></button>
        </form>
    )
}
//save button is a temp solution to onSubmit with enter key