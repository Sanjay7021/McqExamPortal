import express from 'express';
import connectDB from './config/database';
import bodyParser from 'body-parser';
import userRouter from '../src/routes/userRoutes'
import subjectRouter from '../src/routes/subjectRoutes'
import titleRouter from '../src/routes/SubjectTitleRoutes';
import createExamRouter from '../src/routes/examRoutes';
import mcqRouter from '../src/routes/MCQRoutes';
import resultRouter from '../src/routes/resultRoutes';
import finalresultRouter from '../src/routes/finalResultRoutes'

import cors from 'cors';
import 'dotenv/config';

const app = express();

connectDB();
app.get('/',function (req,res,next){
    res.send('Welcome to Mcq Exam Portal');
})

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user/',userRouter);
app.use('/subject/',subjectRouter);
app.use('/title/',titleRouter);
app.use('/createExam/',createExamRouter)
app.use('/MCQ/',mcqRouter);
app.use('/result/',resultRouter);
app.use('/finalresult',finalresultRouter);

export default app;