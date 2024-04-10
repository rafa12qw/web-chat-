import dotenv from "dotenv";

dotenv.config();

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
async function connectMongoDB(){
    try{
        await client.connect();
        console.log('connected to MongoDB');
    }catch (err){
        console.error('Error connecting to mongoDB');
        process.exit(1)
    }
}

export { connectMongoDB, client }