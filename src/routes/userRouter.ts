import { Router } from "express";
import {
  bookAppointment,
  findCategoryDoctors,
  findDoctors,
  findUser,
  getAvailableSlots,
  updateUser,
  userData,
} from "../controllers/user";

const userRouter = Router();

userRouter.get("/", userData);
userRouter.get("/profile", findUser);
userRouter.get("/category", findCategoryDoctors);
userRouter.get("/doctors", findDoctors);
userRouter.get("/getTimeSlots", getAvailableSlots);
userRouter.patch("/bookAppointment", bookAppointment);

userRouter.patch("/update", updateUser);

export default userRouter;
