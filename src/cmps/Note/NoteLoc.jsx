import React from 'react'
import GoogleMapReact from 'google-map-react';

import PinIcon from '../../assets/svg/pin.svg'



export default ({ note }) => {
 
    
const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
    position: { lat: note.data.coords.lat, lng: note.data.coords.lng},
    map,
    icon:PinIcon
    });
    return marker;
   };

    return (
        <div className="note-loc">
            {note.header && <h4>{note.header}</h4>}
            {note.data.name && <h6>{note.data.name}</h6>}
           {note && <div style={{ height: '30vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDGBQTVrw0MAb3SQ9UbI1sMEz9UNedEXzA' }}
                    center={note.data.coords}
                    yesIWantToUseGoogleMapApiInternals={true}
                    defaultZoom={18} 
                    distanceToMouse={() => { }}
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                    >
                    {/* <PinIcon
                        lat={note.data.coords.lat}
                        lng={note.data.coords.lng}
                    /> */}
                </GoogleMapReact>
            </div>}
        </div>
    )
}
