import express, { Router } from 'express';
import userRoute from './user';
import todoRoute from './todo';


const router:Router = express.Router();

router.use("/user", userRoute);
router.use("/todo", todoRoute);


export default router;