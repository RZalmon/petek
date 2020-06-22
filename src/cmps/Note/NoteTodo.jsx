import React, { useEffect, useState, createRef } from 'react'
import { connect } from 'react-redux';
import SocketService from '../../services/SocketService'

import PlusIcon from '../../assets/svg/plus.svg'

import { saveRoom } from '../../actions/RoomActions';


const NoteTodo = ({ note, saveRoom, room, userId, isEdit, currTodoIdx, setCurrTodoIdx }) => {
    const [newTodo, setNewTodo] = useState('');
    const inputRef = createRef();

    const toggleIsDone = async (idx) => {
        if (isEdit) return
        note.data[idx].isDone = !note.data[idx].isDone
        await saveRoom(room)
        SocketService.emit("roomUpdated", { room, userId });
    }

   const addTodo = async () =>{
    setCurrTodoIdx(note.data.length)
    //    note.data.unshift({text:'Add new Todo', isDone:false}) 
    //    await saveRoom(room)
    //    if (inputRef.current) inputRef.current.focus()
       console.log('adddd', currTodoIdx);
   }


    useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
        if (currTodoIdx !== '' && inputRef.current) note.data[currTodoIdx].text = newTodo
    }, [newTodo, currTodoIdx])

    return (
        <div className="note-todo">
            <div className="todo-header">
            {note.header && <h4>{note.header}</h4>}
           {isEdit && <img src={PlusIcon} className="add-todo-button" onClick={() =>{addTodo()}} />}
            </div>
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
                            {(isEdit && currTodoIdx === idx) && <input type="text" value={newTodo} ref={inputRef} onChange={(e) => { setNewTodo(e.target.value); }} />}
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