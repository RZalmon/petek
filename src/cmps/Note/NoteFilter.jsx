import React from 'react'
import { DebounceInput } from 'react-debounce-input';


export default ({ filterBy, setFilterBy, }) => {
    return (
        <section>
            <DebounceInput
                minLength={0}
                className="note-filter-input"
                debounceTimeout={300}
                type="text"
                placeholder={'Search Notes'}
                onChange={e => setFilterBy({ ...filterBy, term: e.target.value })}
            />
            <label for="type-select">Type</label>
            <select id="type-select" onChange={e => setFilterBy({ ...filterBy, type: e.target.value })}>
                <option value="">All</option>
                <option value="NoteText">Text</option>
                <option value="NoteImg">Img</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteTodo">Todos</option>
                <option value="NoteLoc">Location</option>
            </select>
        </section >
    )

}
