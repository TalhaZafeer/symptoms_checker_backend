import { Router } from "express";
import {
  bookAppointment,
  cancelAppointment,
  getAvailableTimeSlots,
  getBookings,
} from "../controllers/booking";

const bookingRouter = Router();

bookingRouter.post("/create", bookAppointment);
bookingRouter.post("/availableSlots", getAvailableTimeSlots);
bookingRouter.patch("/cancelAppointment", cancelAppointment);

bookingRouter.get("/:id", getBookings);

export default bookingRouter;
