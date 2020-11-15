const initialState = {
    rooms: [],
    currRoom: null,
    filterBy: {}
}


export default function RoomReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ROOMS':
            return { ...state, rooms: action.rooms }
        case 'SET_CURR_ROOM':
            return { ...state, currRoom: action.room }
        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    if (room._id === action.room._id) {
                        //after problems fixed return it to one line term
                        console.log('id match!');

                        return action.room;
                    }
                    return room;
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
                        if (currNote._id === action.note._id) return action.note;
                    })
                }
            }
        case 'ADD_NOTE':
            let idx = state.currRoom.notes.findIndex(currNote => !currNote.isPinned);
            return {
                ...state,
                currRoom: {
                    ...state.currRoom,
                    notes: [...state.currRoom.notes.slice(0, idx), action.note, ...state.currRoom.notes.slice(idx, state.currRoom.notes.length)]//probably there is a better solution
                }
            }
        case 'REMOVE_NOTE':
            return {
                ...state,
                currRoom: {
                    ...state.currRoom,
                    notes: state.currRoom.notes.filter(note => note._id !== action.noteId)
                }
            }
        default:
            return state;
    }
};

// currRoom: state.rooms.filter(room => {
//     return room._id !== action.id
// })