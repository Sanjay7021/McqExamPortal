import mongoose from 'mongoose';
const {Schema,model } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator: function (v:any){
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
            },
            message: (props:{value:String}) => 'email id is not valid'
        }
    },
    role:{
        type:String,
        required:[true,'role is required'],
        enum:{
            values:['student','faculty','admin'],
            message: '{VALUE} is not supported'
        }
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        unique:true,
        required:[true,'phone no is required'],
        validate:{
            validator: function (v:any){
                return /[0-9]{10}/.test(v);
            },
            message:(props:{value:String})=> 'Phone no must be 10 digits long'
        }
    },
    address:{
        type:String,
        required:[true,'address is required'],
        min:[10,'at least you have to provide your city name and pincode']
    },
    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetExpires: Date 

},{timestamps:true});

const userModel = model('user',userSchema);
export default userModel;
