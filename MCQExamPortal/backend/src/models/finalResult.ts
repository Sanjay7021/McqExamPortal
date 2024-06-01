import mongoose from "mongoose";
const {Schema, model}= mongoose;

const finalResultSchema = new Schema({
    
    userID:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    total:{
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

const finalresultModel = model('finalResult',finalResultSchema);
export default finalresultModel;
