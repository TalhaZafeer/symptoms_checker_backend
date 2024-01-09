import { Router } from "express";
import {
  bookAppointment,
  cancelAppointment,
  getAvailableTimeSlots,
  getBookings,
} from "../controllers/booking";
const { checkUser } = require("../middlewares/auth.middleware");

const bookingRouter = Router();

bookingRouter.post("/create", bookAppointment);
bookingRouter.post("/availableSlots", getAvailableTimeSlots);
bookingRouter.patch("/cancelAppointment", cancelAppointment);

bookingRouter.get("/:id", checkUser, getBookings);

export default bookingRouter;
