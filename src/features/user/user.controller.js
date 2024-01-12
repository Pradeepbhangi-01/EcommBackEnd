import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signUp(name, email, password, type);

    if (!user) {
      return res.status(401).send("error while creating the user");
    } else {
      res.status(201).send("user registered successfully");
    }
  }

  signIn(req, res) {
    const user = UserModel.signIn(req.body.email, req.body.password);
    if (!user) {
      return res.status(400).send("incorrect credentials");
    } else {
      // create the token

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "jdkqso1jwisoe7dofn4jfbk54mkfwr83dnikmc",
        {
          expiresIn: "2m",
        }
      );

      // send the token to the client
      res.status(200).send(token);
    }
  }

  getAllUsers(req, res) {
    const users = UserModel.getAllUsers();
    res.send(users);
  }
}
