import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { userRouter } from "./routers";
import { authRouter } from "./routers";
import { IError } from "./types";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});
console.log("OK");
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log("Server has started on port", configs.PORT);
});
