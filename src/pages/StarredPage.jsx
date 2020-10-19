import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStarredNotes } from '../actions/RoomActions';
import StarredContainer from '../cmps/Note/StarredContainer'





const StarredPage = ({ user, getStarredNotes }) => {

  const getNotes = async () =>{
    return await getStarredNotes(JSON.parse(JSON.stringify(user)))
  }

  
  useEffect(() => {
   let notes =  getNotes()
     
    console.log(notes);
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

export default connect(mapStateToProps,mapDispatchToProps)(StarredPage);