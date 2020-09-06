import React, { useEffect, useState, createRef,useCallback } from "react";
import Moment from "react-moment";

import NoteText from "./NoteText";
import NoteImg from "./NoteImg";
import NoteVideo from "./NoteVideo";
import NoteTodo from "./NoteTodo";
import NoteLoc from "./NoteLoc";
import Features from "./Features";

import RemoveIcon from "../../cmps/icons/RemoveIcon";
import EditIcon from "../../cmps/icons/EditIcon";
import SaveIcon from "../../cmps/icons/SaveIcon";

import AvatarLoader from '../AvatarLoader'


export default ({ note, user, removeNote, saveRoomChanges, togglePinned }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isNewTodo, setIsNewTodo] = useState(false);
  const [currTodoIdx, setCurrTodoIdx] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const cmps = {
    NoteText,
    NoteImg,
    NoteVideo,
    NoteTodo,
    NoteLoc,
  };
  const NoteType = cmps[note.type];

  const noteRef = createRef();

  const setNoteColor = (color) => {
    note.bgColor = color;
    saveRoomChanges();
  };

  const paintNote = () => {
    if (note.bgColor) noteRef.current.style.backgroundColor = note.bgColor;
  };

  const saveTodoEdits = () => {
    saveRoomChanges();
    setCurrTodoIdx("");
  };

  const onLoad = useCallback(() => {
    console.log("loaded");
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    paintNote();
    if (note.createdBy._id !== user._id) return;
    if (note.createdBy.imgUrl !== user.imgUrl) {
      note.createdBy.imgUrl = user.imgUrl;
      saveRoomChanges();
    }
  }, []);

  useEffect(() => {
    paintNote();
  }, [note.bgColor]);

  return (
    <div className="note-preview">
      <div
        className={
          user._id === note.createdBy._id
            ? "user-container"
            : "friend-container"
        }>
        <img
          src={note.createdBy.imgUrl}
          alt="Note creator avatar"
          className="avatar avatar-s"
          onLoad={onLoad}
          style={{ display: isLoaded ? "block" : "none" }}
        />
        {!isLoaded && <AvatarLoader/>}
        <div className="note-container" ref={noteRef}>
          <div className="note-header">
            <div>
              {/* {((note.type === 'NoteTodo' || note.type === 'NoteText') && !isEdit) && <img src={editIcon} alt="Edit note" className="edit-btn" onClick={() => setIsEdit(true)} />} */}
              {(note.type === "NoteTodo" || note.type === "NoteText") &&
                !isEdit && (
                  <i onClick={() => setIsEdit(true)}>
                    <EditIcon />
                  </i>
                )}
              {(note.type === "NoteTodo" || note.type === "NoteText") &&
                isEdit && (
                  <i
                    onClick={() => {
                      setIsEdit(false);
                      saveTodoEdits();
                    }}>
                    <SaveIcon />
                  </i>
                )}
              {/* {((note.type === 'NoteTodo' || note.type === 'NoteText') && isEdit) && <img src={saveIcon} alt="Save changes" className="save-btn" onClick={() => { setIsEdit(false); saveRoomChanges(); setCurrTodoIdx('') }} />} */}
              <i onClick={() => removeNote(note._id)}>
                <RemoveIcon />
              </i>
            </div>
            <Moment format="MM/DD/YY ,HH:mm">{note.createdAt}</Moment>
          </div>
          <NoteType
            note={note}
            user={user}
            isEdit={isEdit}
            currTodoIdx={currTodoIdx}
            setCurrTodoIdx={setCurrTodoIdx}
            setIsNewTodo={setIsNewTodo}
            isNewTodo={isNewTodo}
          />
          <Features
            togglePinned={togglePinned}
            note={note}
            user={user}
            setNoteColor={setNoteColor}
          />
        </div>
      </div>
    </div>
  );
};
