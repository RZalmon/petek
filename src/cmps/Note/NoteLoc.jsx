import React from 'react'
import GoogleMapReact from 'google-map-react';

import PinIcon from '../icons/PinIcon'

export default ({ note }) => {
    return (
        <div className="note-loc">
            {note.header && <h4>{note.header}</h4>}
            {note.data.name && <h6>{note.data.name}</h6>}
            <div style={{ height: '30vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDGBQTVrw0MAb3SQ9UbI1sMEz9UNedEXzA' }}
                    center={note.data.coords}
                    yesIWantToUseGoogleMapApiInternal
                    defaultZoom={18} 
                    distanceToMouse={() => { }}
                    onGoogleApiLoaded={() => console.log('Map Loaded')}
                    >
                    <PinIcon
                        lat={note.data.coords.lat}
                        lng={note.data.coords.lng}
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}
