// const { Store } = require("@material-ui/icons");
import store from '../store/index'
// const state = store.getState()
// const getNote = ({ state, id, room }) => state.rooms[room].notes[id];

// const getNotes = ({ state, room }) => { console.log('&&&Store&&&', store); state.currRoom.notes }
// function getNotes() {
//     console.log('&&&Store&&&', store);
//     let state = store.getState()
//     return state.room
// }
const getNotes = () => store.getState().room.currRoom.notes;

export default {
    getNotes
}
