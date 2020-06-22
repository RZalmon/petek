import React from 'react'
import { connect } from 'react-redux';
import SocketService from '../../services/SocketService'

import { saveRoom, loadRoomById } from '../../actions/RoomActions';

const NoteTodo = ({ note, saveRoom, room }) => {

    // const [isDone, setIsDone] = useState(false)

    const toggleIsDone = (ev,idx) => {   
        ev.stopPropagation()     
        note.data[idx].isDone = !note.data[idx].isDone
        console.log('isDone', note.data[idx].isDone);
        SocketService.emit("todoUpdated", ({ room }));
        // saveRoom(room)
    }



    // useEffect(() => {
    //     // loadRoomById(room._id)
    //     // console.log('AAAAAFFFFFEEEEECCCCCTTTTT');
    // }, [isDone])

    return (
        <div className="note-todo">
            {note.header && <h4>{note.header}</h4>}
            <ul>
                {!!note.data.length && note.data.map((todo, idx) => {
                    return (
                        <li className={todo.isDone ? 'done' : ''} key={todo.text} onClick={(ev) => toggleIsDone(ev,idx)}>
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
    loadRoomById
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteTodo);