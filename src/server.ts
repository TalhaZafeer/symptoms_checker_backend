import express from "express";
import dotenv from "dotenv";
const bodyParser = require("body-parser");
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config";
import { authRouter, diseaseRouter, userRouter } from "./routes";

const { checkUser } = require("./middlewares/auth.middleware");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

connectDB();

app.get("/", (req, res) => {
  res.send("Express + Typescript Server");
});

app.use("/auth", authRouter);
app.use("/user", checkUser, userRouter);
app.use("/check", diseaseRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
