import { UserService } from '../services/UserService'

export function signUp(user) {
    console.log(user);
    return async dispatch => {
        const newUser = await UserService.signUp(user);
        dispatch({ type: 'SET_USER', newUser })
    }
}
export function login(user) {
    console.log(user);
    return async dispatch => {
        const newUser = await UserService.login(user);
        dispatch({ type: 'SET_USER',newUser })
    }
}
export function logout() {
    const user = null
    return async dispatch => {
        const res = await UserService.logout();        
        dispatch({ type: 'SET_USER',user})
    }
}

export function getUser() {
    return async dispatch => {
        const user = await UserService.getUser();
        dispatch({ type: 'GET_USER', user })
    }
}

//ADD Move
// export function addMove(contact, amount){
//     return async dispatch => {
//       const user = await UserService.addMove(contact,amount);
//       dispatch({ type: 'SET_USER', user })
//     }
// }