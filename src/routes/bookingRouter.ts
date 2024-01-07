import { Router } from "express";
import { bookAppointment, getBookings } from "../controllers/booking";

const bookingRouter = Router();

bookingRouter.get("/", getBookings);
bookingRouter.post("/create", bookAppointment);

export default bookingRouter;
