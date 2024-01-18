import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.respository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import ApplicationError from "../../error-handling/applicationerror.js";

// dotenv.config();

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(newUser);
      res.status(201).send(newUser);
    } catch (error) {
      console.log("controller", error);
      return res.status(500).send("Error in registering the user in database");
    }
  }

  async signIn(req, res, next) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);

      if (!user) {
        return res.status(400).send("Incorrect email Credential");
      } else {
        // compare password with hashed password
        // console.log("body", req.body.password);
        // console.log("user", user.password);
        const result = await bcrypt.compare(req.body.password, user.password);

        // console.log("pp1 userController result", result);

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
