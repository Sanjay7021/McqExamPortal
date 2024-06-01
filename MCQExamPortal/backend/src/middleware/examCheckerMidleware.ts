import MCQModel from "../models/MCQModel";
import resultModel from "../models/resultModel";


export async function examCheckerMidleware(req: any, res: any, next: any) {
    const { ExamID, QuestionID, ans } = req.body;
    console.log(req.body);

    const filter = { "$and": [{ _id: QuestionID }, { ans: ans }] }
    const mcqData = await MCQModel.find(filter);
    console.log("total lenght", mcqData.length);
    const len = mcqData.length;

    const query = { userID:req.userID,ExamID:ExamID,questionID:QuestionID};
    const update = { $set: {userID:req.userID,questionID:QuestionID, count: len } };
    const options = { upsert: true };
    await resultModel.updateOne(query, update, options);
    next();
}   