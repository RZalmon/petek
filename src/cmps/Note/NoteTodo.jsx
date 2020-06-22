import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import SocketService from '../../services/SocketService'

import { saveRoom } from '../../actions/RoomActions';


const NoteTodo = ({ note, saveRoom, room, userId, isEdit }) => {
    const [currTodoIdx, setCurrTodoIdx] = useState('');
    const [newTodo, setNewTodo] = useState('');


    const toggleIsDone = async (idx) => {
        if (isEdit) return
        note.data[idx].isDone = !note.data[idx].isDone
        await saveRoom(room)
        SocketService.emit("roomUpdated", { room, userId });
    }

    const editTodo = (idx, text) => {
        note.data[idx].text = text
    }

    useEffect(() => {
      
    }, [newTodo])


    return (
        <div className="note-todo">
            {note.header && <h4>{note.header}</h4>}
            <ul>
                {!!note.data.length && note.data.map((todo, idx) => {
                    return (
                        <li key={todo.text} onClick={() => {
                            if (isEdit) {
                                setCurrTodoIdx(idx);
                                setNewTodo(todo.text)
                            }
                        }}>
                            {(currTodoIdx !== idx) && <span className={todo.isDone ? 'done' : ''} onClick={(ev) => toggleIsDone(idx)}>{todo.text}</span>}
                            {(isEdit && currTodoIdx === idx) && <input type="text" value={newTodo} onChange={(e) => {setNewTodo(e.target.value)}} />}
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