import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { routes } from './routes.js';
import 'dotenv/config';

const app = express();

const url = 'mongodb://localhost:27017';

try {
    await mongoose.connect(url, {
        dbName: 'personal-blog',
    })

    console.log('Successfully conntected to MDB');

} catch (err) {
    console.log(`Cannot connect to DB ${err.message}`);
}

// Add Cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Позволява приемането на бисквитки
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add body parser if we need to
//app.use(express.urlencoded({ extended: false}));

//cookie parser
app.use(cookieParser());
// Add JSON parser
app.use(express.json());

// Add Routes
app.use(routes);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));