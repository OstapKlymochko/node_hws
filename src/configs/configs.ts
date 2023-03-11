import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5000,
  DB_URL:
    // process.env.DB_URL ||
    "mongodb+srv://car_bimba:car_bimba@cluster0.jpmvyjl.mongodb.net/users",
};
