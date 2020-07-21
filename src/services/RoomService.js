
import { HttpService } from './HttpService';

function query(critirea) {
    const params = new URLSearchParams(critirea);
    return HttpService.get(`room?${params}`);
}


function getById(filterBy) {
    const queryParams = new URLSearchParams();
    if (filterBy) {
        for (const property in filterBy) {
            if (filterBy[property]) {
                queryParams.set(property, filterBy[property])
            }
        }
        return HttpService.get(`room?${queryParams}`);
    }
}



// function getById(filterBy) {
//     console.log(id);
//     return HttpService.get(`room/${id}`);
// }




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


async function checkIsValidUser(userId, roomId) {
    return HttpService.post(`room/${roomId}/validate`, { userId, roomId })
}


export const RoomService = {
    query,
    getById,
    save,
    remove,
    checkIsValidUser
}



