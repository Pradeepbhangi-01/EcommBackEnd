import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.DB_URL;

export const connectMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("mongodb connected using the mongoose");
  } catch (error) {
    console.log("E$rror while connecting to the mongoose", error);
  }
};
