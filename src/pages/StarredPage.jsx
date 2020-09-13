import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RoomPage from '../pages/RoomPage'





const StarredPage = (props) => {

  const { user } = props


  

  return (
      <div>
       {/* <RoomPage notes={user.starredNotes} isStarredPage={false}/> */}
       <h1>balllls</h1>

      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedinUser,

  };
};

// const mapDispatchToProps = {
//   updateUser,

// };

export default connect(mapStateToProps)(StarredPage);