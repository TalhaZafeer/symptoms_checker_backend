import { Request, RequestHandler, Response } from "express";
import { Booking } from "../models/Booking";
import { User } from "../models";
import { createMeeting } from "../utils/zoom";
import RequestWithUser from "../interfaces/requestWithUser";
import { v2 as cloudinary } from "cloudinary";
import { Multer } from "multer";

cloudinary.config({
  cloud_name: "dd7khyujo",
  api_key: "971462388416415",
  api_secret: "YU9V13RdHwWXVkRHbXUD_lfzp0A",
});

export const getBookings: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { user } = req as Request & RequestWithUser;

  try {
    if (user.role === "Patient") {
      const bookings = await Booking.find({ user: id })
        .populate("user", "name")
        .populate("bookingWith", "name");
      res.status(200).json(bookings);
    } else if (user.role === "Doctor") {
      const bookings = await Booking.find({ bookingWith: id })
        .populate("user", "name")
        .populate("bookingWith", "name");
      res.status(200).json(bookings);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAvailableTimeSlots: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { doctor, date } = req.body;

  try {
    const bookings = await Booking.find({
      bookingWith: doctor,
      date: date,
      isValid: true,
    });
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
export const cancelAppointment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  try {
    const result = await Booking.findByIdAndUpdate(
      { _id: id },
      { isValid: false }
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const bookAppointment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (req.files)
    // try {
    //   const files = req.files as Multer[];

    //   const uploadPromises = files.map((file: Multer) => {
    //     return new Promise((resolve, reject) => {
    //       cloudinary.v2.uploader
    //         .upload_stream({ resource_type: "auto" }, (error, result) => {
    //           if (error) {
    //             reject(error);
    //           }
    //           resolve(result);
    //         })
    //         .end(file.buffer);
    //     });
    //   });

    //   const results = await Promise.all(uploadPromises);
    //   res.json(results);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: "Internal Server Error" });
    // }

    try {
      let zoomMeeting;
      if (req.body.bookingType === "Video Consultation") {
        zoomMeeting = await createMeeting("Consultation", 60, req.body.date);
        console.log(zoomMeeting);
      }

      console.log(zoomMeeting);
      const bookedAppointment = await Booking.create({
        ...req.body,
        date: new Date(),
        isValid: true,
        zoomMeeting,
      });
      res.status(200).json(bookedAppointment);
    } catch (error) {
      res.status(500).json(error);
    }
};
