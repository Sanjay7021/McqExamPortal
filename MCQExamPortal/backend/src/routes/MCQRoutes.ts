import express from 'express';
import { authentication, authorized } from '../middleware/authenticateMiddleware';
import * as MCQController from '../controller/MCQController';
const router = express.Router();

router.post('/createMCQ',authentication,authorized('faculty'),MCQController.createMCQController);
router.get('/getMCQ',authentication,authorized('student','faculty'),MCQController.getMCQ);
router.get('/pagination',MCQController.pagination);


export default router;