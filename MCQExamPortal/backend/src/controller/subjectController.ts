import subjectModel from "../models/subjectsModel";


export async function createSubjectController(req:any,res:any,next:any){
    const {subName} = req.body;
    let createdBy = req.userID;

    try{
        const subject  = new subjectModel({
            subName,createdBy
        })
        const createSub = await subjectModel.insertMany(subject);
        console.log(createSub);
        res.status(201).send(createSub);
    }catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}

export async function getAllSubjectsController(req:any,res:any,next:any){
    
    try{

        const allSubjects = await subjectModel.find({}).select('-createdBy')
        console.log(allSubjects);
        res.status(200).send(allSubjects);
        
    }catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}