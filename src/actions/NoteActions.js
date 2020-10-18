import { RoomService } from '../services/RoomService'

export function loadNotes(roomId) {
    return async dispatch => {
        try {
            const room = await RoomService.loadRoomById(roomId);
            dispatch({ type: 'SET_NOTES', notes: room.notes })
        } catch (err) {
            console.log('ERROR', err)
        }
    }
}