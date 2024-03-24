import asyncHandler from 'express-async-handler';

// @ desc --- Save Location
// @ route  --POST-- [base_api]/location
const saveLocation = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {latitude, longitude} = req.body;
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
    console.log('getting locations')

    res.status(200).json([
        {
            latitude: 1.5074,
            longitude: -7.1278,
        },
        {
            latitude: 71.5074,
            longitude: 0.1278,
        },
        {
            latitude: 21.5074,
            longitude: 0.1278,
        },
        {
            latitude: 51.5074,
            longitude: 0.1278,
        },
        {
            latitude: 31.5074,
            longitude: 0.1278,
        },
    ])
})

// const locationController ={
//     saveLocation,
//     getLocations
// }
// export default locationController;

export {
    saveLocation,
    getLocations
}

