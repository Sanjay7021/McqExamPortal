import { Response, Request,NextFunction } from "express";
import userModel from "../models/userModel";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import cookie from 'cookie';

export async function createUserController(req:any,res:any,next:any){
    let {name,email,role,password,phone,address} = req.body;
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt);
    try{
        const user  = new userModel({
            name,email,role,password,phone,address
        })
        const createdUser = await userModel.insertMany(user);
        console.log(createdUser);
        res.status(201).send(createdUser);
    }catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log(email,password);
    
    try {
        const foundData = await userModel.find({ "email": email });
        console.log(foundData);

        if (foundData.length != 0) {
            // console.log('inside');
            

            const validPassword = await bcrypt.compare(password, String(foundData[0].password))
            // console.log(validPassword);
            
            if (!validPassword) {
                res.status(401).send("Invalid Password")
                return;
            }

            if (!process.env.SECRET_KEY) {
                res.send("secret key not defined");
                return;
            }

            // console.log("login", String(foundData[0]._id));
            const payload = {
                "userType": foundData[0].role,
                "userID": foundData[0]._id
            }
            // console.log(payload);
            
            const token = jwt.sign(
                payload, process.env.SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '90d'
            }
            )  

            res.cookie('jwt',token,{
                expires:new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000
                )
            })        
            res.status(200).json({
                status:'Success',
                token,
                foundData
            });

        } else {
            res.status(404).send("Invalid UserID and Password")
        }
    } catch (err) {
        console.error(err)
    }
}
