

import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const register = async(req, res)=>{
    try {
        const {username, phone, email, password} = req.body;
        if(!username || !phone || !email || !password){
            return res.status(400).json({message : "Please enter all the fields"});
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exist , please login"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = new userModel({username, phone, email, password : hashPassword});
        const data = await result.save();
        res.status(200).json({message : "register successfully"});
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

export default register;