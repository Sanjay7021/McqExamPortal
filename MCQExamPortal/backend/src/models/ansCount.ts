import mongoose from "mongoose";
const {Schema, model} = mongoose;

const ans = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    count:{
        type:Number,
        required:true
    },
    ExamID:{
        type:Schema.Types.ObjectId,
        ref:'exam',
        required:true
    }
    
},{timestamps:true});

const ansModel = model('exam',ans);
export default ansModel;

