import React, { useState } from 'react'

import xMark from '../assets/svg/x-mark.svg'
import PlusIcon from '../assets/svg/plus.svg'

export default ({ setNoteHeader }) => {
    const [currTodo, setCurrTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        setTodos([
            ...todos,
            {
                text: currTodo,
                isDone: false
            }
        ]);
        setCurrTodo('')
    };

    return (
        <div className="input-todo">
            <input type="text" placeholder="Header?" onChange={e => setNoteHeader(e.target.value)} />
            <ul>
                {!!todos.length && todos.map(todo => {
                    return (
                        <li className="todo" key={todo.text}>
                            <h6>{todo.text}</h6>
                            <img src={xMark} onClick={() => console.log('fuck you!')} className="x-mark" />
                        </li>
                    )
                })}
            </ul>
            <input type="text" placeholder="task?" onChange={e => setCurrTodo(e.target.value)} />
            <img src={PlusIcon} className="add-button" onClick={() => addTodo()} />
            <button>Save</button>
        </div>
    )
}
