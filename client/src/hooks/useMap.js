import {useEffect, useState} from "react";
import axios from "axios";

export const useMap = () => {
    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    })

    const [lastRecordedPosition, setLastRecordedPosition] = useState(null)
    const [dwellTimeoutId, setDwellTimeoutId] = useState(null)
    const dwellTime = 1000 * 60   // 1 minute (testing purpose)

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                setPosition({lat: coords.latitude, lng: coords.longitude});
            },
            (blocked) => {
                if (blocked) {
                    const fetch = async () => {
                        try {
                            const {data} = await axios.get("https://ipapi.co/json");
                            setPosition({lat: data.latitude, lng: data.longitude});
                        } catch (err) {
                            console.error(err);
                        }
                    };
                    fetch();
                }
            }
        );
    }

    useEffect(() => {
       getCurrentLocation()

        const watchId = navigator.geolocation.watchPosition(
            async ({coords}) => {
                const {latitude, longitude} = coords;
                setPosition({lat: latitude, lng: longitude});

                if (lastRecordedPosition === null ||
                    hasTraveledSignificantDistance(
                        lastRecordedPosition,
                        {latitude, longitude},
                        1000 // 1 km
                    )
                ) {
                    clearTimeout(dwellTimeoutId)
                    const newDwellTimeoutId = setTimeout(() => {
                        sendLocationToBackend({latitude, longitude})
                        setLastRecordedPosition({latitude, longitude})
                    }, dwellTime)
                    setDwellTimeoutId(newDwellTimeoutId)
                }

                // sendLocationToBackend
                await sendLocationToBackend({latitude, longitude})

            }, (error) => {
                console.error(error)
            })

        // cleanup
        return () => {
           navigator.geolocation.clearWatch(watchId)
       }
    }, []);


    const hasTraveledSignificantDistance = (
        {latitude: lat1, longitude: lng1},
        {latitude: lat2, longitude: lng2},
        minDistance
    ) => {
        const R = 6371e3; // Earth's radius (metres)
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lng2 - lng1) * Math.PI) / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // in metres

        return distance >= minDistance;
    }

    const sendLocationToBackend = async ({latitude, longitude}) => {
        try {
            const response = await axios.post("http://127.0.0.1:8080/api/v1/location", {
                latitude,
                longitude
            });
            console.log('Location recorded', response.data)
        } catch (err) {
            console.error("Error sending location to backend");
            console.error(err);
        }
    };

    return {position};
};
