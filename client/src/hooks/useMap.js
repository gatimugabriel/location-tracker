import {useEffect, useState} from "react";
import axios from "axios";
import apiService from "../services/api.service.js";

export const useMap = () => {
    const [currentPosition, setCurrentPosition] = useState({
        lat: 0, lng: 0
    })

    const [lastPosition, setLastPosition] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)
    const timeoutDuration = 1000 * 3 // 10 ms for testing

    const fetchCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setCurrentPosition({lat: coords.latitude, lng: coords.longitude});
        }, (locationBlocked) => {
            if (locationBlocked) {
                const fetchLocation = async () => {
                    try {
                        const {data} = await axios.get("https://ipapi.co/json");
                        setCurrentPosition({lat: data.latitude, lng: data.longitude});
                    } catch (err) {
                        console.error(err);
                    }
                };
                fetchLocation();
            }
        });
    }

    useEffect(() => {
        fetchCurrentLocation()

        const locationWatchId = navigator.geolocation.watchPosition(async ({coords}) => {
            const {latitude, longitude} = coords;
            setCurrentPosition({lat: latitude, lng: longitude});

            if (lastPosition === null || hasSignificantDistanceTravelled(lastPosition, {latitude, longitude}, 1)) {
                clearTimeout(timeoutId)
                const newTimeoutId = setTimeout(async () => {

                    // Check if the new location is the same as the last recorded location
                    console.log('lastPosition', lastPosition)

                    if (lastPosition && lastPosition.latitude === latitude && lastPosition.longitude === longitude) {
                        console.log('User still in the same location. No need to send location to server.');
                    } else {
                        console.log('send coordinates')
                        await sendLocationToServer({latitude, longitude})
                        setLastPosition({latitude, longitude})
                    }

                }, timeoutDuration)
                setTimeoutId(newTimeoutId)
            }
        }, (error) => {
            console.error(error)
        })

        // cleanup
        return () => {
            navigator.geolocation.clearWatch(locationWatchId)
        }
    }, [lastPosition]);

    const hasSignificantDistanceTravelled = ({latitude: lat1, longitude: lng1}, {
        latitude: lat2,
        longitude: lng2
    }, minDistance) => {
        const earthRadiusInMetres = 6371e3; // Earth's radius in metres

        // Convert latitudes and longitudes from degrees to radians
        const lat1InRadians = (lat1 * Math.PI) / 180;
        const lat2InRadians = (lat2 * Math.PI) / 180;
        const deltaLatInRadians = ((lat2 - lat1) * Math.PI) / 180;
        const deltaLngInRadians = ((lng2 - lng1) * Math.PI) / 180;

        // Haversine formula: a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
        const a = Math.sin(deltaLatInRadians / 2) * Math.sin(deltaLatInRadians / 2) + Math.cos(lat1InRadians) * Math.cos(lat2InRadians) * Math.sin(deltaLngInRadians / 2) * Math.sin(deltaLngInRadians / 2);

        // Haversine formula: c = 2 ⋅ atan2( √a, √(1−a) )
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Haversine formula: d = R ⋅ c
        const distanceInMetres = earthRadiusInMetres * c; // Distance in metres

        console.log(minDistance, distanceInMetres)
        console.log(distanceInMetres >= minDistance)
        return distanceInMetres >= minDistance;

        // return true
    }

    const sendLocationToServer = async ({latitude, longitude}) => {
        try {
            const response = await apiService.post("/location", {
                latitude, longitude
            });
            console.log('Location recorded', response.data)
        } catch (err) {
            console.error("Error sending location to server", err.message);
            console.error(err);
        }
    };

    return {position: currentPosition};
};
