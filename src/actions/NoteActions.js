import { NoteService } from '../services/NoteService'

// LIST
export function loadNotes(filterBy) {
    return async dispatch => {
        try {
            const notes = await NoteService.query(filterBy);
            dispatch({ type: 'SET_NOTES', notes })
        } catch (err) {
            console.log('ERROR', err)
        }
    }
}

// READ
export function loadNoteById(id) {
    return async dispatch => {
        try {
            const note = await NoteService.getById(id);   //MAYBE WE DONT NEED
            dispatch({ type: 'SET_CURR_NOTE', note })
        } catch (err) {
            console.log('ERROR', err)
        }
    }
}

//RESET
export function resetCurrNote() {
    return async dispatch => {
        try {
            const note = null
            dispatch({ type: 'SET_CURR_NOTE', note })
        } catch (err) {
            console.log('ERROR:', err)
        }
    }
}

// UPDATE + CREATE
export function saveNote(note) {
    
    return async dispatch => {
        const isEdit = !!note._id
        note = await NoteService.save(note);
        if (isEdit) dispatch({ type: 'UPDATE_NOTE', note })
        else dispatch({ type: 'ADD_NOTE', note })
        return note;
    }
}

// REMOVE

export function deleteNote(id) {
    return async dispatch => {
        await NoteService.remove(id);
        dispatch({ type: 'DELETE_NOTE', id })
    }
}
