// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import "../styles/Dashboard.css";
import { useMap } from "../hooks/index";


function MapComponent() {
    const { position } = useMap();
    return (
        
        <MapContainer center={position} zoom={4.5} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }} zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ZoomControl position="bottomright" />

        </MapContainer>
        
    );
}

export default MapComponent;
