import { RoomService } from "../services/RoomService";
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
  console.log("savavavavavavavavavava");
  return async (dispatch) => {
    try {
      const room = null;
      dispatch({ type: "RESET_CURR_ROOM", room });
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

//setFilterBy

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    dispatch({ type: "SET_FILTER_BY", filterBy });
  };
}

//RESET FILTER BY
export function resetFilterBy() {
  return async (dispatch) => {
    dispatch({ type: "RESET_FILTER_BY" });
  };
}
