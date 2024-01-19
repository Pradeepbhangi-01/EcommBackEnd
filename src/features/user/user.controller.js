import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository1.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import ApplicationError from "../../error-handling/applicationerror.js";

dotenv.config();

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async resetPassword(req, res) {
    const { newPassword } = req.body;
    const userId = req.userId;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    try {
      await this.userRepository.resetPassword(userId, hashedPassword);
      res.status(200).send("password updated successfully");
    } catch (error) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (err) {
      console.log("controller", err);
      if (err instanceof ApplicationError) {
        throw new ApplicationError("Something went wrong with database", 500);
      }
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);

      if (!user) {
        return res.status(400).send("Incorrect email Credential");
      } else {
        // compare password with hashed password
        const result = await bcrypt.compare(req.body.password, user.password);

        if (result) {
          // create the token
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          // send the token to the client
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect password Credentials");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(200).sent("something went wrong");
      // throw new ApplicationError(error, 400);
    }
  }
}
