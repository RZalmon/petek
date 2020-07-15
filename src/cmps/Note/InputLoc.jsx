import React from 'react';

export default ({ setNoteData, setNoteHeader, handleSubmit }) => {


    return (
        <form className="input-loc" onSubmit={handleSubmit}>
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <button hidden>Save</button>
        </form>
    )
}
//save button is a temp solution to onSubmit with enter key