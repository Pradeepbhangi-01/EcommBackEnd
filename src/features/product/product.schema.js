import mongoose, { Schema } from "mongoose";

const productShema = new Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  inStock: Number,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
});

const ProductModel = mongoose.model("Product", productShema);
export default ProductModel;
