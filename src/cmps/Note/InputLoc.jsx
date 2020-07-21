import React, { useState, useEffect, createRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { DebounceInput } from 'react-debounce-input';

import { MapService } from '../../services/MapService'

import SaveIcon from '../icons/SaveIcon'
import GpsIcon from '../icons/GpsIcon'

export default ({ setNoteHeader, setNoteData, noteData, handleSubmit }) => {

    const [locs, setLocs] = useState([]);
    const [selectedLoc, setSelectedLoc] = useState(null)
    const addressInputRef = createRef();

    const searchLoc = async (queryStr) => {
        if (!queryStr) {
            setLocs([])
            return
        }
        let locations = await MapService.searchLocs(queryStr)
        setLocs(locations)
    }


    const setLocNote = (loc) => {
        let dataObj = { name: loc.formatted_address, coords: loc.geometry.location }
        setSelectedLoc(dataObj.coords)
        setNoteData(dataObj)
    }

    const fetchUserCoords = async () => {
        let userPos = await MapService.getPosition()
        if (!userPos) return
        let coords = { lat: userPos.coords.latitude, lng: userPos.coords.longitude }
        setSelectedLoc(coords)
        let res = await MapService.searchAddress(coords)
        if (res) {
            let accurateAddressIdx = res[1] ? 1 : 0
            let address = res[accurateAddressIdx].address_components[accurateAddressIdx].short_name
            let dataObj = { coords: res[accurateAddressIdx].geometry.location }
            if (address) dataObj.name = address
            setNoteData(dataObj)
        }

    }

    const saveNoteLoc = () => {
        handleSubmit()
        setSelectedLoc(null)
        addressInputRef.current.value = ''
    }
    useEffect(() => {
        fetchUserCoords()
    }, [selectedLoc])


    return (
        <div className="input-loc" >
            <input className="input-header" placeholder="Note Header" type="text" onChange={e => setNoteHeader(e.target.value)} />
            <DebounceInput
                className="search-input"
                minLength={0}
                debounceTimeout={500}
                type="text"
                placeholder="Search Location"
                ref={addressInputRef}
            />
            <i onClick={() => fetchUserCoords()}><GpsIcon /></i>
            {!!locs.length && locs.map(loc => {
                return (
                    <div className="loc-card" key={loc.place_id}>
                        <h6 onClick={() => { setLocNote(loc) }}>{loc.formatted_address}</h6>
                    </div>
                )
            })}
            {/* {noteData.name && <h6>{noteData.name}</h6>} */}
            {selectedLoc && <div style={{ height: '30vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDGBQTVrw0MAb3SQ9UbI1sMEz9UNedEXzA' }}
                    center={selectedLoc}
                    distanceToMouse={() => { }}
                    yesIWantToUseGoogleMapApiInternal
                    defaultZoom={18}
                    >
                </GoogleMapReact>
            </div>}
            {noteData && <i onClick={() => saveNoteLoc()}><SaveIcon /></i>}
            <button onClick={() => console.log('noteData:', noteData)}>Test</button>
        </div>
    )
}
