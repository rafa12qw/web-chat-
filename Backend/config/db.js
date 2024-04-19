import dotenv from "dotenv";

dotenv.config();

import mongoose from 'mongoose';

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB');
        process.exit(1);
    }
}

export { connectMongoDB };