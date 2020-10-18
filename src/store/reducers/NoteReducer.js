const initialState = {
    notes: [],
    currNote: null
}


export default function NoteReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_NOTES':
            return { ...state, notes: action.notes }
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
        case 'REMOVE_NOTE':
            return {
                ...state,
                notes: state.notes.filter(note => {
                    return note._id !== action.id
                })
            }
        case 'ADD_ROOM':
            return {
                ...state,
                rooms: [...state.rooms, action.room]
            }
        default:
            return state;
    }
};