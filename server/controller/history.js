
import promptModel from "../models/promptModel.js";
import 'dotenv/config';

const history = async (req, res) => {
    try {
        const id = req.userId;
        if(!id){
            return res.status(400).json({message : "token unavailable"});
        }
        const history = await promptModel.find({userId : id});
        
        if(!history){
            return res.status(400).json({message : "history empty"});
        }
        res.status(200).json({message : "your history", history});
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default history;
