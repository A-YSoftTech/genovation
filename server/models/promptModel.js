

import mongoose from 'mongoose';

const promptSchema = mongoose.Schema({
    user : {
        type : String,
    },
    ai : {
        type : String,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
});

const promptModel = mongoose.model("prompt", promptSchema);

export default promptModel;
