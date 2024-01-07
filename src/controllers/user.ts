import { Request, RequestHandler, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";
import { User } from "../models";
import UserI from "../interfaces/user";
import { hashPassword } from "../utils";

export const userData: RequestHandler = async (req: Request, res: Response) => {
  const { user } = req as Request & RequestWithUser;

  try {
    const result = await User.findOne<UserI>(user._id);
    if (result) {
      const { password, ...rest } = result;
      res.status(200).json(rest);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAvailableSlots: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { doctorId } = req.body;
  const doctor = await User.findOne<UserI>({ _id: doctorId });
  const allSlots = doctor?.availability.timeSlots;
  const appointments = doctor?.appointments.map(
    (appointment) => appointment.appointmentTime
  );
  const availableSlots = allSlots?.filter(
    (slot) => !appointments?.includes(slot)
  );
  res.status(200).json({ allSlots, appointments, availableSlots });
};

export const bookAppointment: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { doctorId } = req.body;
  const { patientName, appointmentTime } = req.body;
  const doctor = await User.findOne({ _id: doctorId });

  const appointments = doctor?.appointments;
  appointments?.push({
    patientName,
    appointmentTime,
  });

  const result = await User.updateOne({ _id: doctorId }, { appointments });
  res.status(200).json(result);
};

export const findUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await User.findOne<UserI>({ _id: id });
    res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const findDoctors: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await User.find({ role: "Doctor" });

    if (result) {
      res.status(200).json(result);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const findCategoryDoctors: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { specialty } = req.body;

  try {
    const result = await User.find<UserI>({ specialty }).populate("specialty");

    if (result) {
      res.status(200).json(result);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    user: { _id },
  } = req as Request & RequestWithUser;

  const updatedData = req.body;
  if (updatedData.password) {
    updatedData.password = await hashPassword(updatedData.password);
    console.log(updatedData);
  }

  try {
    const result = await User.findOneAndUpdate(_id, updatedData);
    if (result) {
      res.status(201).json(result);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
