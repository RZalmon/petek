import React, {useState, useCallback} from 'react';
import { DebounceInput } from 'react-debounce-input';



import { MapService } from '../../services/MapService'


export default ({ onAddLoc ,setNoteHeader }) => {

    const [locs, setLocs] = useState([]);
    const [selectedLoc, setSelectedLoc] = useState(null)


    const searchLoc = async (queryStr) =>{
       let locations = await MapService.searchLocs(queryStr)
       setLocs(locations)
    }


    const setLocNote = (loc) =>{
        let dataObj = {name:loc.formatted_address, coords:loc.geometry.location}
        setSelectedLoc(dataObj.coords)
        onAddLoc(dataObj)
    }



    return (
        <form className="input-loc" >
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <DebounceInput
            className="search-input"
                minLength={0}
                debounceTimeout={500}
                type="text"
                placeholder="Search Location"
                onChange={e => searchLoc(e.target.value)}
            />
               {!!locs.length && locs.map(loc => {
                return (
                    <div className="loc-card" key={loc.place_id}>
                       <h6 onClick={() =>{setLocNote(loc)}}>{loc.formatted_address}</h6>
                    </div>
                )
            })}
            {/* <button onClick={() => {searchLoc(loc)}}>Save</button> */}
        </form>
    )
}
//save button is a temp solution to onSubmit with enter key