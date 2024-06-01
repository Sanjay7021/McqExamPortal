import examModel from "../models/examModel";

export async function createExamController (req:any,res:any,next:any) {
    const {subID,subTitleID,totalQue,duration,marksPerQue} = req.body;
    let createdBy = req.userID;

    try{
        const exam  = new examModel({
            subID,subTitleID,totalQue,duration,marksPerQue,createdBy
        })
        const createdExam = await examModel.insertMany(exam);
        console.log(createdExam);
        res.status(201).send(createdExam);
    }catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}
export async function populateData (req:any,res:any,next:any){
    try {
        const data = await examModel.find({}).populate('subID').populate('subTitleID');
        res.send(data);
    } catch (err) {
        res.status(404).send({
            status:'Fail',
            result:err
        })    
    }
}

export async function getDurationByID (req:any,res:any,next:any){
    try {
        const {id} = req.params;
        const duration = await examModel.findById(id).select('duration');
        if(duration){
            res.send(duration);
            console.log(duration); 
        }        

    } catch (err) {
        
        res.status(404).send({
            status:'Fail',
            result:err
        })    
    }
}