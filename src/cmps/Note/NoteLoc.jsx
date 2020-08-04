import React from 'react'
import GoogleMapReact from 'google-map-react';

import PinIcon from '../../assets/svg/pin.svg'



export default ({ note }) => {
    const mapsSelector = () => {
        if /* if we're on iOS, open in Apple Maps */
            ((navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1) ||
            (navigator.platform.indexOf("iPad") != -1))
            window.open(`maps://maps.google.com/maps?daddr=${note.data.coords.lat},${note.data.coords.lng}&amp;ll=`);

        else /* else use Google */
            window.open(`https://maps.google.com/maps?daddr=${note.data.coords.lat},${note.data.coords.lng}&amp;ll="`);
    }

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: note.data.coords.lat, lng: note.data.coords.lng },
            map,
            icon: PinIcon
        });
        return marker;
    };

    return (
        <div className="note-loc">
            {note.header && <h4>{note.header}</h4>}
            {note.data.name && <h6>{note.data.name}</h6>}
            {note && <div style={{ height: '30vh', width: '100%' }} onClick={mapsSelector}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDGBQTVrw0MAb3SQ9UbI1sMEz9UNedEXzA' }}
                    center={note.data.coords}
                    yesIWantToUseGoogleMapApiInternals={true}
                    defaultZoom={18}
                    distanceToMouse={() => { }}
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                >
                </GoogleMapReact>
            </div>}
        </div>
    )
}
