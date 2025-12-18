

import mongoose from 'mongoose';

const connectDatabase = async()=>{
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if(connect){
        console.log("database connected");
    }
}
export default connectDatabase;