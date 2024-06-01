import mongoose from "mongoose";
const {Schema, model} = mongoose;

const subTitleSchema = new Schema({
    titleName:{
        type:String,
        required:true,
        unique:true
    },
    subjectID:{
        type:Schema.Types.ObjectId,
        ref:'subjects',
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
            
    },
    count:{
        type:Number
    }  
},{timestamps:true})

const subTitleModel = model('subtitle',subTitleSchema);
export default subTitleModel;
