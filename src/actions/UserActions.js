import { UserService } from '../services/UserService'

export function signUp(userName) {
    return async dispatch => {
        const user = await UserService.signUp(userName);
        dispatch({ type: 'SET_USER', user })
    }
}

export function getUser() {
    return async dispatch => {
        const user = await UserService.getUser();
        dispatch({ type: 'GET_USER', user })
    }
}

//ADD Move
export function addMove(contact, amount){
    return async dispatch => {
      const user = await UserService.addMove(contact,amount);
      dispatch({ type: 'SET_USER', user })
    }
}