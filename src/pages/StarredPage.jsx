import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStarredNotes } from '../actions/RoomActions';
import StarredContainer from '../cmps/Note/StarredContainer'





const StarredPage = ({ user, room, getStarredNotes }) => {

  const getNotes = async () => {
     await getStarredNotes(JSON.parse(JSON.stringify(user)))
  }

  const printNotes = () =>{
    console.log('Notes', room.notes);
  }

  useEffect(() => {
    getNotes()
  }, []);


  return (
    <div className="starred-page">
      <h1>Starred</h1>
      {/* <button onClick={printNotes}>check notes</button> */}
      {room && <StarredContainer room={room.notes}/>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    room: state.room.currRoom
  };
};

const mapDispatchToProps = {
  getStarredNotes

};

export default connect(mapStateToProps, mapDispatchToProps)(StarredPage);