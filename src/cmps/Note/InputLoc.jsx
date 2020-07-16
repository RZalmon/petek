import React, { useState, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';
import { DebounceInput } from 'react-debounce-input';



import { MapService } from '../../services/MapService'


export default ({ onAddLoc, setNoteHeader }) => {

    const [locs, setLocs] = useState([]);
    const [selectedLoc, setSelectedLoc] = useState(null)
    const defaultCoords = { lat: 32.158316, lng: 34.8102067 }


    const searchLoc = async (queryStr) => {
        let locations = await MapService.searchLocs(queryStr)
        setLocs(locations)
    }


    const setLocNote = (loc) => {
        let dataObj = { name: loc.formatted_address, coords: loc.geometry.location }
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
                        <h6 onClick={() => { setLocNote(loc) }}>{loc.formatted_address}</h6>
                    </div>
                )
            })}
            {selectedLoc && <div style={{ height: '30vh', width: '30vh' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDGBQTVrw0MAb3SQ9UbI1sMEz9UNedEXzA' }}
                    defaultCenter={selectedLoc}
                    yesIWantToUseGoogleMapApiInternal
                    defaultZoom={18}
                ></GoogleMapReact>
            </div>}
        </form>
    )
}
//save button is a temp solution to onSubmit with enter key