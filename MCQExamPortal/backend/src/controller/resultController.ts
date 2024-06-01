import examModel from "../models/examModel";
import finalresultModel from "../models/finalResult";
import resultModel from "../models/resultModel";
import mongoose from 'mongoose';
export async function createResultController(req:any,res:any,next:any){
    // console.log(req.body);
    const data = await resultModel.find({userID:req.userID});
    res.status('201').send('done');
}

export async function getResultController(req:any,res:any,next:any){
    
    const {ExamID} = req.body;
    const MarksPerQues = await examModel.find({_id:ExamID}).select('marksPerQue');
    console.log("marks per que",MarksPerQues[0].marksPerQue);
    

    let ExamId =new mongoose.Types.ObjectId(ExamID);
    let userId = new mongoose.Types.ObjectId(req.userID); 
    const count = await resultModel.aggregate( [
        { $match: 
            {
                count: { $gt:0 },
                ExamID: ExamId,
                userID:userId
            }
        },
        { $group: { _id: null, count: { $sum: 1 } } }
      ] );

      let total = 0;
      if(count.length != 0){

          total = count[0].count * MarksPerQues[0].marksPerQue;
      }

      const data = new finalresultModel({
        userID:req.userID,
        total:total,
        ExamID:ExamID
      })
      const result = await finalresultModel.insertMany(data)
    console.log(count,result);
    res.send(count);
}


export async function getStudentExamDetail(req:any,res:any,next:any){
    const {ExamID} = req.params;
    try {
        const data = await resultModel.find({ExamID:ExamID},{userID:req.userID}).populate('ExamID').populate('questionID').select('count');
        res.status(200).send(data);
    } catch (err) {
        res.send(err)
    }

}
//{ExamID:ExamID},{userID:req.userID}