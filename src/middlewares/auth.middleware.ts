import { NextFunction, Response, Request } from "express";
import { User } from "../models";
import DecodedToken from "../interfaces/decodedToken";
import RequestWithUser from "../interfaces/requestWithUser";

const jwt = require("jsonwebtoken");

const checkUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.token;
  }

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SIGNATURE,
      async (err: Error, decodedToken: DecodedToken) => {
        if (err) {
          res.locals.user = null;

          next();
        } else {
          const user = await User.findById(decodedToken._id);

          if (user) req.user = user;

          res.locals.user = user;

          next();
        }
      }
    );
  } else {
    res.status(401).json("Un-Authorized Access. Kindly Login");
  }
};

module.exports = { checkUser };
