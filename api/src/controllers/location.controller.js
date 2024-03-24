import asyncHandler from 'express-async-handler';
import db from '../models/index.js';

const { Location } = db;

// @ desc --- Save Location
// @ route  --POST-- [base_api]/location
const saveLocation = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body;

    const newLocation = new Location({
        latitude,
        longitude,
    });

    await newLocation.save();

    res.status(201).json({
        message: "Location recorded successfully",
        data: {
            latitude,
            longitude,
        }
    })
})

// @ desc --- Get Locations
// @ route  --GET-- [base_api]/location
const getLocations = asyncHandler(async (req, res) => {
    const locations = await Location.find({});

    res.status(200).json(locations);
})

export {
    saveLocation,
    getLocations
}
