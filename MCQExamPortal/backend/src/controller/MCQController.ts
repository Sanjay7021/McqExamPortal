import MCQModel from "../models/MCQModel";

export async function createMCQController (req:any,res:any,next:any) {
    const {ExamID,ans,option,question} = req.body;
    let createdBy = req.userID;

    try{
        const MCQ  = new MCQModel({
            ExamID,ans,option,question,createdBy
        })
        const createdMCQ = await MCQModel.insertMany(MCQ);
        console.log(createdMCQ);
        res.status(201).send(createdMCQ);
    }catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}
export async function getMCQ (req:any,res:any,next:any){
    try {
        const data = await MCQModel.find({}).select('-ans');
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send({
            status:'Fail',
            result:err
        })    
    }
}