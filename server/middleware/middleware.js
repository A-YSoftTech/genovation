

import 'dotenv/config';
import jwt from 'jsonwebtoken';

const verifyToken = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({success : false, message : "token not found"})
        }
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message : error.message})
    }
}

export default verifyToken;
