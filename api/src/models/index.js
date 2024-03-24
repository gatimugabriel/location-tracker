import mongoose from "mongoose";
import userModel from './user.model.js'
import locationModel from "./location.model.js";
import tokenModel from "./token.model.js";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log(`Successfully connected to database!`)
    } catch (e) {
        console.error(`DB connection Error: ${e.message}`)
        process.exit(1)
    }
}

const db = {
    connectDB,
    User: userModel(mongoose),
    Location: locationModel(mongoose),
    Token: tokenModel(mongoose)
}

export default db
