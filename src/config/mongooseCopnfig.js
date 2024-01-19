import dotenv from "dotenv";
import mongoose from "mongoose";
import CategoryModel from "../features/product/category.schema.js";

dotenv.config();

const url = process.env.DB_URL;

export const connectMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("mongodb connected using the mongoose");
    addCategories();
  } catch (error) {
    console.log("E$rror while connecting to the mongoose", error);
  }
};

async function addCategories() {
  const categories = CategoryModel.find();
  if (!categories || (await categories).length === 0) {
    await CategoryModel.insertMany([
      { name: "Books" },
      { name: "Cloths" },
      { name: "Electronics" },
    ]);
  }

  console.log("Categories added");
}
