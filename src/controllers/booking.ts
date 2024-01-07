import { Request, RequestHandler, Response } from "express";
import { Booking } from "../models/Booking";
import { User } from "../models";
import dayjs from "dayjs";

export const getBookings: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { user } = req.body;

  try {
    const bookings = await Booking.find({ user });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAvailableTimeSlots: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { doctor } = req.body;
  const date = dayjs(req.body.date).format("MMM ddd, YYYY");

  try {
    const bookings = await Booking.find({ bookingWith: doctor, date });
    const bookedTimeSlots = bookings?.map((booking) => booking.timeSlot);

    const user = await User.findOne({ _id: doctor });
    const freeSlots = user?.availability?.timeSlots.filter(
      (timeSlot) => !bookedTimeSlots.includes(timeSlot)
    );

    res.status(200).json({ bookedTimeSlots, freeSlots, user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const bookAppointment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const date = dayjs(req.body.date).format("MMM ddd, YYYY");

  try {
    const bookedAppointment = await Booking.create({ ...req.body, date });
    res.status(200).json(bookedAppointment);
  } catch (error) {
    res.status(500).json(error);
  }
};
