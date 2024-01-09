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
userRouter.get("/category", findCategoryDoctors);
userRouter.get("/doctors", findDoctors);

userRouter.get("/:id", findUser);

userRouter.patch("/update", updateUser);

export default userRouter;
