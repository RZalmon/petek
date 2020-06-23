import React, { useEffect, useState, createRef } from 'react'
import { connect } from 'react-redux';
import SocketService from '../../services/SocketService'

import PlusIcon from '../../assets/svg/plus.svg'
import MinusIcon from '../../assets/svg/minus.svg'
import ArrowIcon from '../../assets/svg/arrow.svg'

import { saveRoom } from '../../actions/RoomActions';
//TODO: IMPROVE EDIT INPUT AND MINUS UI +++ reflect trough socket

const NoteTodo = ({ note, saveRoom, room, userId, isEdit, currTodoIdx, setCurrTodoIdx, setIsNewTodo, isNewTodo }) => {
    const [editedTodo, setEditedTodo] = useState('');
    const [newTodo, setNewTodo] = useState('');
    const editInputRef = createRef();
    const newTodoInputRef = createRef()

    const toggleIsDone = async (idx) => {
        if (isEdit) return
        note.data[idx].isDone = !note.data[idx].isDone
        await saveRoom(room)
        SocketService.emit("roomUpdated", { room, userId });
    }


    const addTodo = () => {
        let todoToAdd = { text: newTodo, isDone: false }
        note.data.push(todoToAdd);
        setIsNewTodo(false)
        setNewTodo('')
        newTodoInputRef.current.value = ''
    };

    const removeTodo = (idx) => {
        note.data.splice(idx, 1)
    }

    useEffect(() => {
        if (editInputRef.current) editInputRef.current.focus()
        if (currTodoIdx !== '' && editInputRef.current) note.data[currTodoIdx].text = editedTodo
    }, [editedTodo, currTodoIdx])

    return (
        <div className="note-todo">
            <div className="todo-header">
                {note.header && <h4>{note.header}</h4>}
                {isEdit && <img src={PlusIcon} className="new-todo-btn" onClick={() => { setIsNewTodo(true) }} />}
            </div>
            <ul>
                {!!note.data.length && note.data.map((todo, idx) => {
                    return (
                        <li key={todo.text} onClick={() => {
                            if (isEdit) {
                                setCurrTodoIdx(idx);
                                setEditedTodo(todo.text)
                            }
                        }}>
                            {(currTodoIdx !== idx) && <span className={todo.isDone ? 'done' : ''} onClick={(ev) => toggleIsDone(idx)}>{todo.text}</span>}
                            {isEdit && <img src={MinusIcon} className="remove-todo-btn" onClick={() => removeTodo(idx)} />}
                            {(isEdit && currTodoIdx === idx) && <input type="text" value={editedTodo} ref={editInputRef} onChange={(e) => { setEditedTodo(e.target.value); }} />
                            }
                        </li>
                    )
                })}
            </ul>
            {isNewTodo && <div>
                <input type="text" placeholder="New Todo" ref={newTodoInputRef} onChange={e => setNewTodo(e.target.value)} />
                <img src={ArrowIcon} className="add-todo-btn" onClick={() => { addTodo() }} />
            </div>}

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