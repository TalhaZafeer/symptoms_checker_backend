import { Request, Response, RequestHandler } from "express";
import { User } from "../models";
import mongoose from "mongoose";
import { TOKEN_AGE } from "../../constants";

const jwt = require("jsonwebtoken");

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user?._id);

    res.cookie("token", token, {
      // httpOnly: true,
      maxAge: TOKEN_AGE,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const signup: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: TOKEN_AGE,
    });

    res.status(201).json(user);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

function createToken(_id: mongoose.Types.ObjectId): string {
  return jwt.sign({ _id }, process.env.JWT_SIGNATURE, { expiresIn: TOKEN_AGE });
}
