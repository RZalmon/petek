import React, { useEffect, useState, createRef } from 'react'
import { connect } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';

import SocketService from '../../services/SocketService'

import PlusIcon from '../../assets/svg/plus.svg'
import xmark from '../../assets/svg/cross.svg'
import ArrowIcon from '../../assets/svg/arrow.svg'

import { saveRoom } from '../../actions/RoomActions';
//TODO: IMPROVE EDIT INPUT AND MINUS UI +++ reflect trough socket

const NoteTodo = ({ note, saveRoom, room, userId, isEdit, currTodoIdx, setCurrTodoIdx, setIsNewTodo, isNewTodo }) => {
    const [editedTodo, setEditedTodo] = useState('');
    const [newTodo, setNewTodo] = useState('');
    const [progress, setProgress] = useState(0)
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

    const culcProgress = () => {
        let doneTodosCount = note.data.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc;
        }, 0);
        let prog = parseInt(doneTodosCount / note.data.length * 100)
        setProgress(prog)
    }

    useEffect(() => {
        culcProgress()
    });


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
                            <div>
                            <input type="checkbox" onClick={(ev) => toggleIsDone(idx)} checked={todo.isDone} readOnly />
                            {(currTodoIdx !== idx) && <span className={todo.isDone ? 'done' : ''} >{todo.text}</span>}
                            </div>
                            {(isEdit && currTodoIdx === idx) && <input type="text" value={editedTodo} ref={editInputRef} onChange={(e) => { setEditedTodo(e.target.value); }} />
                            }
                            {isEdit && <img src={xmark} className="remove-todo-btn" onClick={() => removeTodo(idx)} />}
                        </li>
                    )
                })}
            </ul>
            <div className="progress-bar">
            <ProgressBar completed={progress} labelSize={!progress ? '0' : '0.75rem' }/>
            </div>
            {isNewTodo && <div>
                <input type="text" placeholder="New Todo" ref={newTodoInputRef} onChange={e => setNewTodo(e.target.value)} />
                <img src={ArrowIcon} className="add-todo-btn" onClick={() => addTodo()} />
            </div>}

        </div>
    )
}
//checkbox read only prop makes error go away, we will let it stay for a while
const mapStateToProps = (state) => {
    return {
        room: state.room.currRoom,
    };
};

const mapDispatchToProps = {
    saveRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteTodo);