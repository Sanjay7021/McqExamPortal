import express from 'express';
import * as subjectController from '../controller/subjectController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';
const app = express();

const router = express.Router();

router.post('/createsubject',authentication,authorized('faculty'),subjectController.createSubjectController);
router.get('/getSubjects',authentication,authorized('faculty'),subjectController.getAllSubjectsController);
export default router;

