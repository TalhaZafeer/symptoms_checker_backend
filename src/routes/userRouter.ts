import { Router } from "express";
import { findUser, updateUser, userData } from "../controllers/user";

const userRouter = Router();

userRouter.get("/", userData);
userRouter.get("/profile", findUser);
userRouter.patch("/update", updateUser);

export default userRouter;
