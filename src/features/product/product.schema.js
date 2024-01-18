import mongoose, { Schema } from "mongoose";

export const productShema = new Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  inStock: Number,
});
