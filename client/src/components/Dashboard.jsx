import React, { useState } from "react";
import MapComponent from "./Mapcomponent";
import "../styles/Dashboard.css";
import { Menu, Settings, Save, Share2,ChevronRight, MapPin, Navigation  } from 'lucide-react';

function Dashboard(){
  const [sidebarOpen,setSidebarOpen] = useState(false);

  const toggleSidebar= () => setSidebarOpen(!sidebarOpen);

return(
        <div>
          <div className="sidewhole-container">
            <div className={`sidebar ${sidebarOpen ? 'active': 'inactive'}`}>
            {/* Sidebar content goes here */}
            <div className="sidebar-options">
              <div className="option"  >
                <Settings color="#588157" />
              </div>
              <div className="option" >
                <Save color="#588157" />
              </div>
              <div className="option" >
                <Share2 color="#588157" />
              </div>
              <div className="option" >
                <ChevronRight  color="#588157" />
              </div>
            </div>
            <div className="route-inputs">
              <div className="input-container">
                <MapPin color="#588157" className="placeholder-icon" />
                <input type="text" placeholder="current Location" />
              </div>
              <div className="input-container">
                <Navigation color="#588157" className="placeholder-icon" />
                <input placeholder="go to Location"></input>
              </div>
              <button>GO</button>
              
            </div>
            <div className="history">
              <h3>Locations you've visited</h3>
              <hr></hr>
              <p id="p-img"><MapPin color="#588157" size={20} /><span>Thistle London Heathrow Terminal 5</span></p>
              <hr></hr>
              <p><MapPin color="#588157" size={20} /><span>Hilton Garden Inn London Heathrow Terminals 2 and 3
</span></p>
              <hr></hr>
              <p><MapPin color="#588157" size={20} /><span>Holiday Inn Express London Heathrow T4, an IHG Hotel</span></p>
              <hr></hr>
              <p><MapPin color="#588157" size={20}/><span>Crowne Plaza London Heathrow T4, an IHG Hotel</span></p>
              <hr></hr>
              <p><MapPin color="#588157" size={20}/><span>Travelodge London Kingston upon Thames</span></p>
              
              

            </div>
            
            </div>
            <div className="trigger-container">
              <div className="logo">LOGO</div>
              
                <div className="trigger-1" onClick={toggleSidebar} >
                  <Menu color="#588157" />
                </div>
                
              
            </div>
          </div>
          <div className="dashboard">
              <div className="map-integration">
                  <MapComponent />
              </div> 
          </div>


        </div>
)
}

export default Dashboard;
