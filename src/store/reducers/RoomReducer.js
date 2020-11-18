const initialState = {
    rooms: [],
    currRoom: null,
    filterBy: {}
}


export default function RoomReducer(state = initialState, action) {
    let notesCopy;
    let idx;
    switch (action.type) {
        case 'SET_ROOMS':
            return { ...state, rooms: action.rooms }
        case 'SET_CURR_ROOM':
            return { ...state, currRoom: action.room }
        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    return (room._id === action.room._id) ? action.room : room;
                })
            }
        case 'DELETE_ROOM':
            return {
                ...state,
                rooms: state.rooms.filter(room => {
                    return room._id !== action.id
                })
            }
        case 'ADD_ROOM':
            return {
                ...state,
                rooms: [...state.rooms, action.room]
            }
        case 'SET_FILTER_BY':
            return { ...state, filterBy: action.filterBy }
        case 'RESET_FILTER_BY':
            return { ...state, filterBy: null }
        case 'UPDATE_NOTE':
            return {
                ...state,
                currRoom: {
                    ...state.currRoom,
                    notes: state.currRoom.notes.map(currNote => {
                        return (currNote._id === action.note._id) ? action.note : currNote;
                    })
                }
            }
        case 'ADD_NOTE':
            notesCopy = JSON.parse(JSON.stringify(state.currRoom.notes))
            idx = notesCopy.findIndex(currNote => !currNote.isPinned);
            (idx === -1) ? notesCopy.push(action.note) : notesCopy.splice(idx, 0, action.note)
            return {
                ...state,
                currRoom: {
                    ...state.currRoom,
                    notes: notesCopy
                }
            }
        case 'REMOVE_NOTE':
            return {
                ...state,
                currRoom: {
                    ...state.currRoom,
                    notes: state.currRoom.notes.filter(currNote => currNote._id !== action.noteId)
                }
            }
        case 'SET_PIN_NOTE':
            notesCopy = JSON.parse(JSON.stringify(state.currRoom.notes))
            idx = notesCopy.findIndex(currNote => currNote._id === action.note._id);
            notesCopy.splice(idx, 1)
            notesCopy.unshift(action.note)
            return {
                ...state,
                currRoom: {
                    ...state.currRoom,
                    notes: notesCopy
                }
            }
        case 'SET_UNPIN_NOTE':
            notesCopy = JSON.parse(JSON.stringify(state.currRoom.notes))
            const toDeleteIdx = notesCopy.findIndex(currNote => currNote._id === action.note._id);
            notesCopy.splice(toDeleteIdx, 1)//remove old note
            const toUpdateIdx = notesCopy.findIndex(currNote => !currNote.isPinned && currNote.createdAt <= action.note.createdAt);//find correct IDX
            toUpdateIdx === -1 ? notesCopy.push(action.note) : notesCopy.splice(toUpdateIdx, 0, action.note);//INSERT NOTE
            return {
                ...state,
                currRoom: {
                    ...state.currRoom,
                    notes: notesCopy
                }
            }
        default:
            return state;
    }
};

