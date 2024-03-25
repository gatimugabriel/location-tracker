import {MapPin} from "lucide-react";

// eslint-disable-next-line react/prop-types
const PreviousLocations = ({locations, locationNames, isLoading, selectLocation, selectedMarker}) => {
    if (isLoading){
        return <p>Loading...</p>
    }

    return (
        <div className="history">
            <h3>Locations you&apos;ve visited</h3>
            <hr/>

            <section className="history-container">
                {locationNames.length === 0 && <p>Once locations are saved, they will appear here</p>}
            {/* eslint-disable-next-line react/prop-types */}
            {locationNames.map((location, index) => (
                <div key={index} onClick={() => {
                    selectLocation(locations[index], index)
                }}
                     className={selectedMarker === index ? 'previous-location selected-location' : 'previous-location'}
                >
                    <div><MapPin color={selectedMarker === index ? 'white' : '#588157'} size={20}/></div>
                    <div>
                        {location}
                        {/*{locations[index]?.latitude}, {locations[index]?.longitude}*/}
                    </div>
                </div>
            ))}
            </section>
        </div>
    );
};

export default PreviousLocations;
