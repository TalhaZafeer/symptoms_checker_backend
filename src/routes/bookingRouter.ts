import { Router } from "express";
import {
  bookAppointment,
  cancelAppointment,
  getAvailableTimeSlots,
  getBookings,
} from "../controllers/booking";
import multer from "multer";
const { checkUser } = require("../middlewares/auth.middleware");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const bookingRouter = Router();

bookingRouter.post("/create", upload.array("files", 5), bookAppointment);
bookingRouter.post("/availableSlots", getAvailableTimeSlots);
bookingRouter.patch("/cancelAppointment", cancelAppointment);

bookingRouter.get("/:id", checkUser, getBookings);

export default bookingRouter;
