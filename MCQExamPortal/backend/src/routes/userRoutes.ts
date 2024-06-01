import express from "express";
import * as userController from '../controller/userController';
import { authentication, authorized } from "../middleware/authenticateMiddleware";
const router = express.Router();

router.post('/createUser',userController.createUserController);
router.post('/login',userController.loginUser);


export default router;