import dotenv from "dotenv";

dotenv.config();

import { client } from "../config/db.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const generateToken = (userId, username) => {
    return jwt.sign(
        { userId, username },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "8h",
        }
    );
};

const signUp = async(req,res) => {
    const{ username, password } = req.body
    try{
        const existingUser = await client.db().collection('users').findOne({username});
        if(existingUser){
            return res.status(400).json({error:"This user already exists"});  
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await client.db().collection('users').insertOne({
            username,
            password: hashedPassword
        })
        const userID = result.insertedId;
        const token = generateToken(userID, username);
        
        res.status(201).json({ token, userID});


    }catch(err){
        console.error('Error finding the user in the database');
        res.status(500).json({error:'Internal error server'});
    }
}

export { signUp };