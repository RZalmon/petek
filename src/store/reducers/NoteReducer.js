const initialState = {
    notes: [],
    currNote: null
}


export default function NoteReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_NOTES':
            return { ...state, notes: action.notes }
        case 'SET_CURR_NOTE':
            return { ...state, currNote: action.note }
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map(note => {
                    if (note._id === action.note._id) return action.note;
                    return note;
                })
            }
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter(note => {
                    return note._id !== action.id
                })
            }
        case 'ADD_NOTE':
            return {
                ...state,
                notes: [...state.notes, action.note]
            }
        default:
            return state;
    }
};