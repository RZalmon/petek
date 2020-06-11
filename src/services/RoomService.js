
import { HttpService } from './HttpService';
import { StorageService } from './StorageService';


// const ROOM_KEY = 'notes';



function query(critirea) {
    const params = new URLSearchParams(critirea);
    return HttpService.get(`room?${params}`);
}
function getById(id) {
    return HttpService.get(`room/${id}`);
}
function remove(id) {
    return HttpService.delete(`room/${id}`);
}

async function save(room) {
    let prm;

    if (room._id) prm = HttpService.put(`room/${room._id}`, room);
    else {
        prm = HttpService.post('room', room);
    }
    const res = await prm;
    return res;
}

function getEmptyRoom() {
    return {
        roomId: '',
        notes: [],
        createdAt: ''
    }
}



export const RoomService = {
    query,
    getById,
    save,
    remove,
}


// function getEmptyCritirea() {
//     return {
//         txt: '',
//         searchIn: '',
//         page: '',
//         sortBy: ''
//     }
// }


