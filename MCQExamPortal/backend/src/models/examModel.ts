import mongoose from "mongoose";
const {Schema, model} = mongoose;

const examSchema = new Schema({
 
    subID:{
        type:Schema.Types.ObjectId,
        ref:'subjects',
        required:true
    },
    subTitleID:{
        type:Schema.Types.ObjectId,
        ref:'subtitle',
        required:true
    },
    totalQue:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    marksPerQue:{
        type:Number,
        required:true
    }
    ,
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
  
    }  
},{timestamps:true});

const examModel = model('exam',examSchema);
export default examModel;

