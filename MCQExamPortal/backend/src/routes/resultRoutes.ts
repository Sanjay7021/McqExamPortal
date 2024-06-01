import express from 'express';
import * as resultController from '../controller/resultController';
import { examCheckerMidleware } from '../middleware/examCheckerMidleware';
import { authentication, authorized } from '../middleware/authenticateMiddleware';
const router = express.Router();

router.post('/createResult',authentication,authorized('student','faculty'),examCheckerMidleware,resultController.createResultController);
router.post('/storeResult',authentication,authorized('student','faculty'),resultController.getResultController);
router.get('/getStudentExamDetail/:ExamID',authentication,authorized('student','faculty'),resultController.getStudentExamDetail);

export default router;
