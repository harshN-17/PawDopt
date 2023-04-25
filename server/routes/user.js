import express from "express";
import { getUser, getUserConnects, updateConnect } from "../controllers/user.js";
import { verifyToken } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.route('/:id').get(verifyToken, getUser);
userRouter.route("/:id/connects").get(verifyToken, getUserConnects);

userRouter.route("/:id/:connectId").patch(verifyToken, updateConnect);

export default userRouter;