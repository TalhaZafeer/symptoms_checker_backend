import { Router } from "express";
import {
  bookAppointment,
  getAvailableTimeSlots,
  getBookings,
} from "../controllers/booking";

const bookingRouter = Router();

bookingRouter.post("/create", bookAppointment);
bookingRouter.post("/availableSlots", getAvailableTimeSlots);
bookingRouter.get("/:id", getBookings);

export default bookingRouter;
