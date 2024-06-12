import mongoose from "mongoose";
const {Schema, model}= mongoose;

const resultSchema = new Schema({
    
    userID:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    questionID:{
        type:Schema.Types.ObjectId,
        ref:'mcq'
    },
    studentAns:{
        type:String
    }
    ,
    count:{
        type:Number,
        required:true
    },
    ExamID:{
        type:Schema.Types.ObjectId,
        ref:'exam',
        required:true
    },
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
    }
},{timestamps:true});

const resultModel = model('result',resultSchema);
export default resultModel;
