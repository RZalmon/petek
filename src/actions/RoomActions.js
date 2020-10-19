import { RoomService } from "../services/RoomService";
import noteSelector from "../selectors/notes";
// LIST
export function loadRooms(filterBy) {
  return async (dispatch) => {
    try {
      const rooms = await RoomService.query(filterBy);
      dispatch({ type: "SET_ROOMS", rooms });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

// READ
export function loadRoomById(filterBy) {
  return async (dispatch) => {
    try {
      const room = await RoomService.getById(filterBy);
      dispatch({ type: "SET_CURR_ROOM", room });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

//RESET
export function resetCurrRoom() {
  return async (dispatch) => {
    try {
      const room = null;
      dispatch({ type: "SET_CURR_ROOM", room });
    } catch (err) {
      console.log("ERROR:", err);
    }
  };
}

// UPDATE + CREATE
export function saveRoom(room) {
  return async (dispatch) => {
    const isEdit = !!room._id;
    room = await RoomService.save(room);
    if (isEdit) dispatch({ type: "SET_CURR_ROOM", room });
    // dispatch({ type: 'UPDATE_ROOM', room })
    else dispatch({ type: "ADD_ROOM", room });
    return room;
  };
}

// REMOVE

export function deleteRoom(id) {
  return async (dispatch) => {
    await RoomService.remove(id);
    dispatch({ type: "DELETE_ROOM", id });
  };
}

//REMOVE NOTE
export function removeNote(roomId, noteId) {
  return async (dispatch) => {
    try {
      let room = await RoomService.removeNote(roomId, noteId);
      dispatch({ type: "SET_CURR_ROOM", room });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

export function changeNoteColor(roomId, noteId, color) {
  return async (dispatch) => {
    try {
      let room = await RoomService.changeNoteColor(roomId, noteId, color);
      dispatch({ type: "SET_CURR_ROOM", room });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

export function toggleNotePin(roomId, noteId) {
  return async (dispatch) => {
    try {
      let room = await RoomService.toggleNotePin(roomId, noteId);
      dispatch({ type: "SET_CURR_ROOM", room });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

export function updateNote(roomId, note) {
  return async (dispatch) => {
    try {
      let room = await RoomService.updateNote(roomId, note);
      dispatch({ type: "SET_CURR_ROOM", room });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}

export function getStarredNotes(user) {
  return async (dispatch) => {
    try {
      let notes = await RoomService.getStarredNotes(user);
      let room = { notes };
      dispatch({ type: "SET_CURR_ROOM", room });
    } catch (err) {
      console.log("ERROR", err);
    }
  };
}
