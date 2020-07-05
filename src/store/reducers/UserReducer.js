const initialState = {
    loggedinUser: null
}


export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':    
        console.log(action.user);
        if(action.user === null){
            return { ...state, loggedinUser: action.user }   
        }   
        return { ...state, loggedinUser: { ...action.user } }
            case 'GET_USER':
            return { ...state, loggedinUser: action.user }
        default:
            return state;
    }
};