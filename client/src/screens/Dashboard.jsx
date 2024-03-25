import {useState} from "react";
import {ChevronRight, MapPin, Menu, Navigation, Save, Settings, Share2} from 'lucide-react';

import "../styles/Dashboard.css";
import {useHistory} from "../hooks/useHistory.js";
import MapComponent from "../components/Mapcomponent.jsx";
import PreviousLocations from "../components/location/PreviousLocations.jsx";

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {locations, locationNames, isLoading} = useHistory()
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const selectLocation = (location, index) => {
        setSelectedLocation(location)
        setSelectedMarker(index)
    }

    return (
        <div>
            <div className="sidewhole-container">

                {/* ******* Sidebar content ********* */}
                <div className={`sidebar ${sidebarOpen ? "active" : "inactive"}`}>

                    {/* options */}
                    <div className="sidebar-options">
                        <div className="option">
                            <Settings color="#588157"/>
                        </div>
                        <div className="option">
                            <Save color="#588157"/>
                        </div>
                        <div className="option">
                            <Share2 color="#588157"/>
                        </div>
                        <div className="option">
                            <ChevronRight color="#588157"/>
                        </div>
                    </div>

                    {/* route inputs */}
                    <div className="route-inputs">
                        <div className="input-container">
                            <MapPin color="#588157" className="placeholder-icon"/>
                            <input type="text" placeholder="current Location"/>
                        </div>
                        <div className="input-container">
                            <Navigation color="#588157" className="placeholder-icon"/>
                            <input placeholder="go to Location"></input>
                        </div>
                        <button>GO</button>
                    </div>

                    {/* location history */}
                    <PreviousLocations
                        locations={locations}
                        locationNames={locationNames}
                        isLoading={isLoading}
                        selectLocation={selectLocation}
                        selectedMarker={selectedMarker}
                    />
                </div>

                {/* trigger container */}
                <div className="trigger-container">
                    <div className="logo">LOGO</div>

                    <div className="trigger-1" onClick={toggleSidebar}>
                        <Menu color="#588157"/>
                    </div>
                </div>
            </div>

            {/* map display */}
            <div className="dashboard">
                <div className="map-integration">
                    <MapComponent
                        locations={locations}
                        locationNames={locationNames}
                        isLoading={isLoading}
                        selectedLocation={selectedLocation}
                        selectedMarker={selectedMarker}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
