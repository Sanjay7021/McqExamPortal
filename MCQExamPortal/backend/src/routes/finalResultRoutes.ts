import express from 'express';
import * as finalresultController from '../controller/finalResultController';
// import { examCheckerMidleware } from '../middleware/examCheckerMidleware';
import { authentication, authorized } from '../middleware/authenticateMiddleware';
const router = express.Router();

router.get('/viewResult',authentication,authorized('student','faculty'),finalresultController.getFinalResult);
router.get('/showResultsToFaculty',authentication,authorized('faculty'),finalresultController.showResultToFacultyOfStudent);


export default router;
