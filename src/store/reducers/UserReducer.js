const initialState = {
    loggedinUser: null
}



export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedinUser: action.user  }
            case 'GET_USER':
                console.log(state.loggedinUser);  
            return { ...state, loggedinUser: action.user }
        default:
            return state;
    }
};