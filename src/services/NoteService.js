import { HttpService } from './HttpService.js'


async function removeNote(roomId, noteId) {
    return HttpService.delete(`note/removeNote`, { roomId, noteId });
}

async function changeNoteColor(roomId, noteId, color) {
    return HttpService.put(`note/changeNoteColor`, {
        roomId,
        noteId,
        color,
    });
}

async function toggleNotePin(roomId, noteId) {
    return HttpService.put(`note/toggleNotePin`, { roomId, noteId });
}

async function updateNote(roomId, note) {
    return HttpService.put(`note/updateNote`, { roomId, note });
}

async function toggleStarredNote(userId, roomId, noteId) {
    return await HttpService.put(`note/toggleStar`, { userId, roomId, noteId })
}

function getStarredNotes(user) {
    const queryParams = new URLSearchParams();
    if (user) {
        for (const property in user) {
            if (user[property]) {
                queryParams.set(property, JSON.stringify(user[property]));
            }
        }
        return HttpService.get(`note/starredNotes/?${queryParams}`);
    }
}


export const NoteService = {
    removeNote,
    changeNoteColor,
    toggleNotePin,
    updateNote,
    toggleStarredNote,
    getStarredNotes
}