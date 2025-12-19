

import 'dotenv/config'
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "Please enter all the fields"});
        }
        const checkEmail = await userModel.findOne({email});
        if(!checkEmail){
            return res.status(400).json({message : "Email not exist"});
        }
        const checkPassword = await bcrypt.compare(password, checkEmail.password);
        if(!checkPassword){
            return res.status(400).json({message : "Invalid credentials"});
        }
        const token = jwt.sign({userId : checkEmail._id}, process.env.JWT_KEY, {expiresIn : "1h"});
        res.cookie("token", token, {httpOnly : true, secure : true, sameSite : "none", maxAge : 3600000})
        res.status(200).json({message : "login successfully", token});
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

export default login;