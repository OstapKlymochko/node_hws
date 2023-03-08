import { model, Schema } from "mongoose";

import { EGenders } from "../types/user.types";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  // password: {
  //   type: String,
  //   required: [true, "Password is required"],
  // },
  gender: {
    type: String,
    enum: EGenders,
  },
});

export const User = model("user", userSchema);
