import React from 'react'
import { DebounceInput } from 'react-debounce-input';

export default ({ filterBy, setFilterBy, moveToContact, placeHolder }) => {

    const onKeyHandler = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault()
            moveToContact()
        }
    }

    return (
        <form>
            <DebounceInput
                minLength={0}
                className="filter-input"
                debounceTimeout={300}
                type="text"
                placeholder={placeHolder ? placeHolder : 'Search Contacts'}
                onChange={e => setFilterBy({ ...filterBy, term: e.target.value })}
                onKeyDown={onKeyHandler}
            />
        </form>
    )

}
