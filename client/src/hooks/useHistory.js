import {useEffect, useState} from "react";
import axios from "axios";
import apiService from "../services/api.service";

export const useHistory = () => {
    const [locations, setLocations] = useState([])
    const [locationNames, setLocationNames] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchLocationHistory = async () => {
        setIsLoading(true)
        try {
            // const response = await axios.get("http://192.168.4.105:8080/api/v1/location");
            const response = await apiService.get("/location");
            setLocations(response.data);
            return response.data
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };
    
    const fetchLocationNames = async ({locations}) => {
        const names = await Promise.all(
            // eslint-disable-next-line react/prop-types
            locations.map(async ({latitude, longitude}) => {
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiZ2dhYnUiLCJhIjoiY2x1MWdlb3UyMGxzODJqdDQ5eHM2MHh6MSJ9.8TQjMGznHl2PuLMmCRt9HQ`
                )

                return response.data.features[0]?.place_name || "Unknown location"
            })
        )

        setLocationNames(names)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchLocationHistory().then((data) => {
            fetchLocationNames({locations: data}).then(() => console.log('fetched'))
        });
    }, []);


    return {locations, locationNames, isLoading}
}

