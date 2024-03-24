// MapComponent.jsx

import "../styles/Dashboard.css"
import {useMap} from "../hooks/useMap.js";

import {MapContainer, Marker, Popup, TileLayer, ZoomControl} from "react-leaflet";
import L from "leaflet";

import redPlaceholder from '../assets/placeholder-red.png';
import yellowPlaceholder from '../assets/placeholder-yellow.png';
import bluePlaceholder from '../assets/placeholder-blue.png';

const createIcon = (iconUrl, iconSize = [42, 42]) => {
    return L.icon({
        iconUrl,
        iconSize,
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
    });
}

const redIcon = createIcon(redPlaceholder);
const yellowIcon = createIcon(yellowPlaceholder)
const blueIcon = createIcon(bluePlaceholder, [38, 38]);

// import Map, {Marker, Popup} from 'react-map-gl';

// eslint-disable-next-line react/prop-types
const MapComponent = ({locations, locationNames, isLoading, selectedLocation, selectedMarker}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { position } = useMap() || selectedLocation;

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <MapContainer
                center={position}
                zoom={3}
                zoomControl={false}
                scrollWheelZoom={true}
                style={{height: "100vh", width: "100%"}}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* previous locations */}
                {locations.length > 0 && locations.map((location, index) => (
                    <Marker key={index} position={[location.latitude, location.longitude]} icon={selectedMarker === index ? yellowIcon : blueIcon}>
                        <Popup>
                            {locationNames[index]}
                        </Popup>
                    </Marker>
                ))}

                {/* current location */}
                    <Marker position={position} icon={redIcon}>
                        <Popup>
                            You are here
                        </Popup>
                    </Marker>
                <ZoomControl position="bottomright"/>
            </MapContainer>


            {/*<Map*/}
            {/*    mapLib={import('mapbox-gl')}*/}
            {/*    initialViewState={{*/}
            {/*        longitude: -100,*/}
            {/*        latitude: 40,*/}
            {/*        zoom: 2*/}
            {/*    }}*/}
            {/*    style={{width: '100%', height: '100%'}}*/}
            {/*    // mapStyle="mapbox://styles/mapbox/streets-v9"*/}
            {/*    mapStyle="mapbox://styles/ggabu/clu2vvni500zd01p7b25h4t8h"*/}
            {/*    mapboxAccessToken={accessToken}*/}
            {/*>*/}

            {/*    {locations.length > 0 && locations.map((location, index) => (*/}
            {/*        <Marker*/}
            {/*            latitude={location.latitude}*/}
            {/*            longitude={location.longitude}*/}
            {/*            key={index} position={[location.latitude, location.longitude]}*/}
            {/*        >*/}
            {/*            <Popup*/}
            {/*                key={index}*/}
            {/*                latitude={location.latitude}*/}
            {/*                longitude={location.longitude}*/}
            {/*                position={[location.latitude, location.longitude]}*/}
            {/*            >*/}
            {/*                {previousLocations[index]}*/}
            {/*            </Popup>*/}

            {/*        </Marker>*/}
            {/*    ))}*/}

            {/*</Map>*/}

        </>
    )
};

export default MapComponent;
