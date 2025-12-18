
import 'dotenv/config'
import userModel from '../models/userModel.js';



const fetch = async(req,res)=>{
    try {
        const id = req.userId;
        
        if(!id){
            return res.status(400).json({message : "token not in backend"});
        }
        const response = await userModel.findById(id);
        if(!response){
            return res.status(400).json({message : "user not found"});
        }
        res.status(200).json({message : "fetch data", details : response});

    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}
export default  fetch;