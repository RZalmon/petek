const initialState = {
    rooms: [],
    currRoom: null
}


export default function RoomReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ROOMS':
            return { ...state, rooms: action.rooms }
        case 'SET_CURR_ROOM':
            console.log('SET_CURR_ROOM REDUCER', action.room);
            return { ...state, currRoom: action.room }
        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map(room => {
                    if (room._id === action.room._id) return action.room;
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
        default:
            return state;
    }
};