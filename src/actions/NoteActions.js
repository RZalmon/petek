import { NoteService } from '../services/NoteService'


export function addNote(userId, roomId, note) {
    return async (dispatch) => {
        try {
            let newNote = await NoteService.addNote(userId, roomId, note);
            dispatch({ type: "ADD_NOTE", note: newNote });
        } catch (err) {
            console.log("ERROR", err);
        }
    };
}



export function toggleStarredNote(userId, roomId, noteId, isStarredPage) {
    return async dispatch => {
        try {
            let user = await NoteService.toggleStarredNote(userId, roomId, noteId);
            dispatch({ type: 'SET_USER', user })
            if (isStarredPage) {
                let notes = await NoteService.getStarredNotes(user)
                dispatch({ type: "SET_CURR_ROOM", room: { notes } })
            }
        } catch (err) {
            console.log('ERROR', err)
        }
    }
}

export function removeNote(roomId, noteId) {
    return async (dispatch) => {
        try {
            await NoteService.removeNote(roomId, noteId);
            dispatch({ type: "REMOVE_NOTE", noteId });
            //SET_USER AFTER REMOVING NOTE
        } catch (err) {
            console.log("ERROR", err);
        }
    };
}

// export function changeNoteColor(roomId, noteId, color) {
//     return async (dispatch) => {
//         try {
//             let room = await NoteService.changeNoteColor(roomId, noteId, color);
//             dispatch({ type: "SET_CURR_ROOM", room });
//         } catch (err) {
//             console.log("ERROR", err);
//         }
//     };
// }
//OPT2
export function changeNoteColor(roomId, noteId, color) {
    return async (dispatch) => {
        try {
            let updatedNote = await NoteService.changeNoteColor(roomId, noteId, color);
            dispatch({ type: "UPDATE_NOTE", note: updatedNote });
        } catch (err) {
            console.log("ERROR", err);
        }
    };
}

export function toggleNotePin(roomId, noteId) {
    return async (dispatch) => {
        try {
            let room = await NoteService.toggleNotePin(roomId, noteId);
            dispatch({ type: "SET_CURR_ROOM", room });
        } catch (err) {
            console.log("ERROR", err);
        }
    };
}

export function updateNote(roomId, note, isStarredPage = false) {
    return async (dispatch) => {
        try {
            let updatedNote = await NoteService.updateNote(roomId, note);
            dispatch({ type: "UPDATE_NOTE", note: updatedNote })
        } catch (err) {
            console.log("ERROR", err);
        }
    };
}

export function getStarredNotes(user) {
    return async (dispatch) => {
        try {
            let notes = await NoteService.getStarredNotes(user);
            let room = { notes };
            dispatch({ type: "SET_CURR_ROOM", room });
        } catch (err) {
            console.log("ERROR", err);
        }
    };
}

