import mongoose from "mongoose";

// can add validation for input fields
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  type: { type: String, enum: ["customer", "Seller"] },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
