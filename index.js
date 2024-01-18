import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

import productRouter from "./src/features/product/routes/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import bodyParser from "body-parser";
import apiDocs from "./swagger.json" assert { type: "json" };
import jwtAuth from "./src/middleware/jwtAuth.middleware.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import ApplicationError from "./src/error-handling/applicationerror.js";
import connectToMongodb from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectMongoose } from "./src/config/mongooseCopnfig.js";

const app = express();

// CORS policy configuration
app.use(cors());

//middlewares

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", jwtAuth, cartRouter);
app.use("/api/orders", jwtAuth, orderRouter);

app.get("/", (req, res) => {
  res.send("response from the server");
});

app.use((err, req, res, next) => {
  console.log(err);

  // userdefined error
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }
  // server error
  res.status(500).send("OOPs Something went wrong");
});

// for handling 404 errors
app.use((req, res) => {
  res
    .status(404)
    .send(
      "API is not found. Please reach out to the  link for preffered API's -> http://localhost:5000/api-docs"
    );
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
  // connectToMongodb();
  connectMongoose();
});
