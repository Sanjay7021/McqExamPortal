import examModel from "../models/examModel";
import finalresultModel from "../models/finalResult";

export async function getFinalResult (req:any,res:any,next:any){
    try {
        const data = await finalresultModel.find({userID:req.userID}).populate('ExamID');
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send({
            status:'Fail',
            result:err
        })    
    }
}

export async function showResultToFacultyOfStudent(req:any,res:any,next:any) {
    try {
        const facultyCreatedExam = await examModel.find({createdBy:req.userID});
        console.log(facultyCreatedExam);
        let extractedData:any = [];
        for(let data of facultyCreatedExam){
            console.log(data._id);
            const result = await finalresultModel.find({ExamID:data._id}).populate('userID').populate('ExamID')
            if(result){
                extractedData.push(...result); 
            }     
        }
        res.send(extractedData);

    } catch (err) {
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }    
}