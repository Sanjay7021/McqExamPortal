import express from 'express';
import { authentication, authorized } from '../middleware/authenticateMiddleware';
import * as examController from '../controller/examController';
const router = express.Router();

router.post('/createExam',authentication,authorized('faculty'),examController.createExamController);
router.get('/getExam',authentication,authorized('faculty','student'),examController.populateData);
router.get('/getDuration/:id',authentication,authorized('faculty','student'),examController.getDurationByID);

export default router;