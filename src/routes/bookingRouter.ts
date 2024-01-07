import { Router } from "express";
import {
  bookAppointment,
  getAvailableTimeSlots,
  getBookings,
} from "../controllers/booking";

const bookingRouter = Router();

bookingRouter.get("/", getBookings);
bookingRouter.post("/create", bookAppointment);
bookingRouter.get("/availableSlots", getAvailableTimeSlots);

export default bookingRouter;
