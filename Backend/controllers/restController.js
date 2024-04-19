import dotenv from "dotenv";

dotenv.config();

import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
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
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"This user already exists"});  
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();
        const token = generateToken(newUser._id, username);
        
        res.status(201).json({ token });


    }catch(err){
        console.error('Error finding the user in the database');
        res.status(500).json({error:'Internal error server'});
    }
}

const signIn = async (req,res) =>{
    const {username , password } = req.body;
    try{
        const findedUser = await User.findOne({username});
        if (!findedUser){
            res.status(404).json({message : "username not finded"});
        }
        const comparisonResult = await bcrypt.compare(
            password,findedUser.password
        );
        if(comparisonResult){
            const token = generateToken(findedUser._id, username);
            res.json({token});
        }else{
            res.status(401).json({ message: "Incorrect password" });
        }
    }catch(err){
        console.log('Error finding the user in the database');
        res.status(500).json({error:'Internal error server'});
    }
}

const checkToken = async (req,res) => {
    const token = req.body.token;
    if(!token) {
        res.status(401).json({error:true, message :"Token unavailable"});
    }
    try{
        jwt.verify(
            token,
            dotenv.config().parsed.JWT_SECRET_KEY,
            (err,decodedToken) => {
                if (err){
                    res.status(401).json({error:true, message: "invalide token"});
                }
                const newToken = generateToken(decodedToken.userID,decodedToken.username);
                res.json({error:false, message:"valide Token", token: newToken});
            }
        );
    }catch(err){
        if (err instanceof jwt.JsonWebTokenError){
            res.status(401).json({error:true, message:"Invalide token"});
        }
        res.status(500).json({error:true, message:"Server error"});
    }
}

const searchUser = async (req,res) =>{
    const searchTerm = req.query.term; //Getting the term of the search in the parameters of the consult

    try{
        const users = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
        
        if (users.length > 0){
            //if we get users we send a list of users as response
            res.status(200).json(users);
        }else{
            res.status(404).json({message : 'Users not found'});
        }
    }catch (err){
        console.error('Error searching user : ',err);
        res.status(500).json({message: 'Error searching user. Please try again later'});
    }

}
export { signUp, signIn, checkToken,searchUser };