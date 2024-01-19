import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const CategoryModel = mongoose.model("Categories", categorySchema);

export default CategoryModel;
