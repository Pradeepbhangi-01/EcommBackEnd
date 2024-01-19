import mongoose from "mongoose";
import UserModel from "./user.schema.js";
import ApplicationError from "../../error-handling/applicationerror.js";

export default class UserRepository {
  async signUp(user) {
    try {
      // create the instatnce of a model

      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signIn(email, password) {
    try {
      // create the instatnce of a model
      await UserModel.findOne({ email, password });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email, password) {
    try {
      const user = UserModel.findOne({ email });
      return user;
    } catch (error) {
      return error;
    }
  }

  async resetPassword(userId, hashedPassword) {
    try {
      let user = await UserModel.findById(userId);
      if (user) {
        user.password = hashedPassword;
        user.save();
        return user;
      } else {
        console.log("user not found");
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
