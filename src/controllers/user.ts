import { Request, RequestHandler, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";
import { User } from "../models";
import UserI from "../interfaces/user";
import bcrypt from "bcrypt";
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

export const findUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const result = await User.findOne<UserI>(id);
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
