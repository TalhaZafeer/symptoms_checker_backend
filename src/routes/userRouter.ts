import { Router } from "express";
import {
  findCategoryDoctors,
  findDoctors,
  findUser,
  updateUser,
  userData,
} from "../controllers/user";

const userRouter = Router();

userRouter.get("/", userData);
userRouter.get("/profile", findUser);
userRouter.get("/category", findCategoryDoctors);
userRouter.get("/doctors", findDoctors);
userRouter.patch("/update", updateUser);

export default userRouter;
