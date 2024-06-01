import express from 'express';
import * as titelController from '../controller/titleController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';



const router = express.Router();

router.post('/addTitle',authentication,authorized('faculty'),titelController.createTitleController);
router.get('/getTitle',authentication,authorized('faculty'),titelController.getAllTitleController);

export default router;