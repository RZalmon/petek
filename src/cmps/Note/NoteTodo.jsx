import React from 'react'
import { connect } from 'react-redux';
import { saveRoom } from '../../actions/RoomActions';

const NoteTodo = ({ note, saveRoom, room }) => {

    const toggleIsDone = (idx) => {
        note.data[idx].isDone = !note.data[idx].isDone
        console.log('isDone:', note.data[idx].isDone);

        saveRoom(room)
    }
    return (
        <div className="note-todo">
            <h4>{note.header}</h4>
            <ul>
                {!!note.data.length && note.data.map((todo, idx) => {
                    return (
                        <li className={todo.isDone ? 'done' : ''} key={todo.text} onClick={() => toggleIsDone(idx)}>
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
    saveRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteTodo);