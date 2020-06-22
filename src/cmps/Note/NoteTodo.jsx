import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import SocketService from '../../services/SocketService'

import { saveRoom } from '../../actions/RoomActions';

const NoteTodo = ({ note, saveRoom, room,userId }) => {


    const toggleIsDone = async (idx) => {           
        note.data[idx].isDone = !note.data[idx].isDone
       await saveRoom(room)
        SocketService.emit("roomUpdated", { room, userId });
    }
    



    return (
        <div className="note-todo">
            {note.header && <h4>{note.header}</h4>}
            <ul>
                {!!note.data.length && note.data.map((todo, idx) => {
                    return (
                        <li className={todo.isDone ? 'done' : ''} key={todo.text} onClick={(ev) => toggleIsDone(idx)}>
                            {todo.text}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
    };
};

const mapDispatchToProps = {
    saveRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteTodo);