// import express from "express";
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const readUsers = async () => {
//   const users = await fs.readFile(path.join(__dirname, "DB", "users.json"), {
//     encoding: "utf-8",
//   });
//   return JSON.parse(users);
// };
//
// const writeUsers = async (users) =>
//   await fs.writeFile(
//     path.join(__dirname, "DB", "users.json"),
//     JSON.stringify(users)
//   );
//
// app.get("/users", async (req: Request, res: Response) => {
//   // const users = await readUsers();
//   const users = await User.find();
//   res.status(200).json(users);
// });
// app.get("/users/:userId", async (req, res) => {
//   const { userId } = req.params;
//   if (!Number.isInteger(+userId) || +userId < 1) {
//     return res.status(400).end("Invalid id");
//   }
//   const users = await readUsers();
//
//   const seekUser = users.filter((val) => val.id === +userId)[0];
//
//   if (!seekUser) {
//     return res.status(400).end("No such user");
//   }
//   res.status(200).json(seekUser);
// });
//
//
//
// app.post("/users", async (req, res) => {
//   const newUser = req.body;
//   const { name, age, gender } = newUser;
//   if (!name || name.length < 2 || typeof name !== "string") {
//     return res.status(400).end("Invalid name field value");
//   }
//   if (!age || !Number.isInteger(age) || age < 0) {
//     return res.status(400).end("Invalid age field value");
//   }
//   if (!gender || (gender !== "male" && gender !== "female")) {
//     return res.status(400).end("Invalid gender field value");
//   }
//   const users = await readUsers();
//   users.push({ id: users[users.length - 1].id + 1 || 1, ...newUser });
//   await writeUsers(users);
//   res.status(201).json(newUser);
// });
//
// app.put("/users/:userId", async (req, res) => {
//   const { userId } = req.params;
//
//   if (!Number.isInteger(+userId) || +userId < 1) {
//     return res.status(400).end("Invalid id");
//   }
//   const newUser = req.body;
//
//   const { name, age, gender } = newUser;
//
//   if (!name || name.length < 2 || typeof name !== "string") {
//     return res.status(400).end("Invalid name field value");
//   }
//   if (!age || !Number.isInteger(age) || +age < 0) {
//     return res.status(400).end("Invalid age field value");
//   }
//   if (!gender || (gender !== "male" && gender !== "female")) {
//     return res.status(400).end("Invalid gender field value");
//   }
//   const users = await readUsers();
//   const i = users.findIndex((val) => val.id === +userId);
//   if (i === -1) {
//     return res.status(400).json("No such user");
//   }
//
//   users[i] = { id: +userId, ...newUser };
//   await writeUsers(users);
//   res.status(200).json(newUser);
// });
//
// app.delete("/users/:userId", async (req, res) => {
//   const { userId } = req.params;
//   if (!Number.isInteger(+userId) || +userId < 1) {
//     return res.status(400).end("Invalid id");
//   }
//   const users = await readUsers();
//   const i = users.findIndex((val) => val.id === +userId);
//   if (i === -1) {
//     return res.status(400).json("No such user");
//   }
//   const removedOne = users.splice(i, 1);
//   await writeUsers(users);
//   res.status(200).json(removedOne);
// });
app.use("/users", userRouter);
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(5000, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/users");
  console.log("Listening to port 5000");
});
