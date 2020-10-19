import { RoomService } from '../services/RoomService';
import { UserService } from '../services/UserService'

export function signUp(user) {
    return async dispatch => {
        const newUser = await UserService.signUp(user);
        dispatch({ type: 'SET_USER', newUser })
    }
}
export function login(user) {
    return async dispatch => {
        const newUser = await UserService.login(user);
        dispatch({ type: 'SET_USER', user: newUser })
    }
}
export function logout() {
    const user = null
    return async dispatch => {
        await UserService.logout();
        dispatch({ type: 'SET_USER', user })
    }
}

export function getUser() {
    return async dispatch => {
        const user = await UserService.getLoggedinUser();
        dispatch({ type: 'GET_USER', user })
        // const latestUser = await UserService.getUpdatedUser();
        // dispatch({ type: 'GET_USER', latestUser })
    }
}

export function toggleStarredNote(userId, roomId, noteId, isStarredPage) {
    return async dispatch => {
        try {
            let user = await UserService.toggleStarredNote(userId, roomId, noteId);
            dispatch({ type: 'SET_USER', user })
            if (isStarredPage) {
                console.log('****I hope you are in starred page****');
                let notes = await RoomService.getStarredNotes(user)
                dispatch({ type: "SET_CURR_ROOM", room: { notes } })
            }
        } catch (err) {
            console.log('ERROR', err)
        }
    }
}



// export function getUpdatedUser() {
//     return async dispatch => {
//         const user = await UserService.getUpdatedUser();
//         console.log('user in actions');
//         dispatch({ type: 'GET_USER', user })
//     }
// }

export function updateUser(user) {
    return async dispatch => {
        const updatedUser = await UserService.update(user);
        dispatch({ type: 'SET_USER', user: updatedUser })
    }
}