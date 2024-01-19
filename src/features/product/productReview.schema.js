import mongoose from "mongoose";

const productReviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: Number,
});

const ReviewModel = mongoose.model("Review", productReviewSchema);
export default ReviewModel;
