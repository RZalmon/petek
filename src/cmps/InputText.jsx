import React from 'react';

export default ({ setNoteData, handleSubmit }) => {


    return (
        <form className="input-text" onSubmit={handleSubmit}>
            <input placeholder="Say Something" type="text" onChange={e => setNoteData(e.target.value)} />
        </form>
    )
}