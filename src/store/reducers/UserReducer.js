const initialState = {
    loggedinUser: null
}


export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            console.log(action.user);
            if (!action.user) return {...state, loggedinUser: action.user }
            else return {...state, loggedinUser: {...action.user } }
        case 'GET_USER':
            console.log('in reducer bitchhh', action.user);
            return {...state, loggedinUser: action.user }
        default:
            return state;
    }
};