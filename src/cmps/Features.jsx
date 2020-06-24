import React ,{useEffect} from 'react';
import emptyStar from '../assets/svg/empty-star.svg'
import star from '../assets/svg/star.svg'

export default ({togglePinned, note, user}) => {
      

    useEffect(() => {
       console.log(note);
       
    }, [note])
    

    return (
     <div className="features-container">
         <img src={user.pinnedNotes.find(id =>{return id === note._id }) ? star : emptyStar } alt="" onClick={() => togglePinned(note)}/>
       
     </div>
    )
}
//save button is a temp solution to onSubmit with enter key