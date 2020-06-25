import React, { useState } from 'react'

import xMark from '../assets/svg/x-mark.svg'
import PlusIcon from '../assets/svg/plus.svg'
import saveIcon from '../assets/svg/save.svg'


export default ({ setNoteHeader, setNoteData, handleSubmit, noteData }) => {
    const [currTodo, setCurrTodo] = useState('');

    const textInput = React.useRef();

    const addTodo = () => {
        setNoteData([
            ...noteData, {
                text: currTodo,
                isDone: false
            }])
        setCurrTodo('')
        textInput.current.value = ''
    };

    const handleRemoveTodo = (todoIdx) => {
        setNoteData(noteData.filter((todo, idx) => todoIdx !== idx))
    }

    return (
        <div className="input-todo">
            <input type="text" placeholder="Header?" className="input-header" onChange={e => setNoteHeader(e.target.value)} />
            <ul>
                {!noteData.length && <h5>No Todo's Added</h5>}
                {!!noteData.length && noteData.map((todo, idx) => {
                    return (
                        <li className="todo" key={todo.text}>
                            <span>{todo.text}</span>
                            <img src={xMark} onClick={() => handleRemoveTodo(idx)} className="x-mark" alt="x Icon" />
                        </li>
                    )
                })}
            </ul>
            <div className="add-todo-container">
                <input type="text" placeholder="task?" className="input-task" ref={textInput} onChange={e => setCurrTodo(e.target.value)} />
                <img src={PlusIcon} className="add-button" onClick={() => addTodo()} alt="Plus Icon" />
            </div>

                <img src={saveIcon} className="add-button" onClick={handleSubmit} alt="Plus Icon" />
        </div>
    )
}
