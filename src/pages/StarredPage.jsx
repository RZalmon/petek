import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStarredNotes } from '../actions/RoomActions';
import StarredContainer from '../cmps/Note/StarredContainer'





const StarredPage = ({ user, getStarredNotes }) => {


  useEffect(() => {
    getStarredNotes(user._id)
  }, []);


  return (
    <div className="starred-page">
      <h1>Starred</h1>
      {/* <StarredContainer /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,
  };
};

const mapDispatchToProps = {
  getStarredNotes

};

export default connect(mapStateToProps)(StarredPage);