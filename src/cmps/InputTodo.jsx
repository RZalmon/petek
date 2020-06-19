import React, { useState, useRef, createRef } from 'react'

import xMark from '../assets/svg/x-mark.svg'
import PlusIcon from '../assets/svg/plus.svg'

export default ({ setNoteHeader, setNoteData, handleSubmit }) => {
    const [currTodo, setCurrTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const textInput = React.useRef();

    const addTodo = () => {
        setTodos([
            ...todos,
            {
                text: currTodo,
                isDone: false
            }
        ]);
        setNoteData(todos)
        setCurrTodo('')
        textInput.current.value = ''
    };

    const handleRemoveTodo = (todoIdx) => {
        setTodos(todos.filter((todo, idx) => todoIdx !== idx))
    }

    // const onHandleSubmit = () => {
    //     handleSubmit()
    // }

    return (
        <div className="input-todo">
            <input type="text" placeholder="Header?" className="input-header" onChange={e => setNoteHeader(e.target.value)} />
            <ul>
                {!!todos.length && todos.map((todo, idx) => {
                    return (
                        <li className="todo" key={todo.text}>
                            <span>{todo.text}</span>
                            <img src={xMark} onClick={() => handleRemoveTodo(idx)} className="x-mark" />
                        </li>
                    )
                })}
            </ul>
            <div className="add-todo-container">
                <input type="text" placeholder="task?" className="input-task" ref={textInput} onChange={e => setCurrTodo(e.target.value)} />
                <img src={PlusIcon} className="add-button" onClick={() => addTodo()} />
            </div>
            <button onClick={handleSubmit}>Save</button>
        </div>
    )
}
