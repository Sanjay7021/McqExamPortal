import subTitleModel from "../models/SubTitleModel";

export  async function createTitleController(req:any,res:any,next:any) {
    const {subjectID,titleName} =  req.body;
    let createdBy = req.userID;

    try{
        const title  = new subTitleModel({
            subjectID,titleName,createdBy
        })
        console.log(title);
        
        const createTitle = await subTitleModel.insertMany(title);
        console.log(createTitle);
        res.status(201).send(createTitle);
    }catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}


export async function getAllTitleController(req:any,res:any,next:any){
    
    try{

        const allTitles = await subTitleModel.find({}).select('-createdBy')
        console.log(allTitles);
        res.status(200).send(allTitles);
        
    }catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}