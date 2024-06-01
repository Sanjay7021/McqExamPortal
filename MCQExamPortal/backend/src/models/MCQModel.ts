import mongoose from "mongoose";
const {Schema, model} = mongoose;

const examSchema = new Schema({
    ExamID:{
        type:Schema.Types.ObjectId,
        ref:'exam',
        required:true   
    },
    question:{
            type:String,
            required:true
        },
        option:{
            type:[String],
            required:true,
            minlength:2,
            maxlength:4
        },
        ans:{
            type:String,
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

const MCQModel = model('mcq',examSchema);
export default MCQModel;

