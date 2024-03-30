import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/error.middleware.js';

import db from './models/index.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

// --- CORS ---//
const corsOptions = {
    origin: [process.env.CLIENT_ORIGIN, process.env.CLIENT_LOCAL_ORIGIN],
    credentials: true,
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// --- Routes ---//
const base_api = '/api/v1';
routes(app, base_api);

// Error Middleware
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Connecting to database...`);

    // connect to database
    await db.connectDB()
});
