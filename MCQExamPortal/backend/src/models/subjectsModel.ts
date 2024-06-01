import mongoose from "mongoose";
const {Schema, model} = mongoose;

const subjectSchema = new Schema({
    subName:{
        type:String,
        required:[true, 'please insert subject'],
        unique:true
    },
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

const subjectModel = model('subjects',subjectSchema);
export default subjectModel;