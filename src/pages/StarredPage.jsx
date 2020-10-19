import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStarredNotes, resetCurrRoom } from '../actions/RoomActions';

import StarredContainer from '../cmps/Note/StarredContainer'
import Loading from '../cmps/Loading'



const StarredPage = ({ room, user, getStarredNotes, resetCurrRoom }) => {


  const getNotes = async () => {
    return await getStarredNotes(JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    getNotes()
    return () => {
      resetCurrRoom()
    }
  }, []);


  return (
    <div className="starred-page">
      <h1>Starred</h1>
      {room ? <StarredContainer notes={room.notes} user={user} isStarredPage={true} /> : <Loading />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
    room: state.room.currRoom,
  };
};

const mapDispatchToProps = {
  getStarredNotes,
  resetCurrRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(StarredPage);