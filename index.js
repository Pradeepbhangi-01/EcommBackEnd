import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import productRouter from "./src/features/product/routes/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import bodyParser from "body-parser";
import apiDocs from "./swagger.json" assert { type: "json" };
import jwtAuth from "./src/middleware/jwtAuth.middleware.js";

const app = express();

// let corsOptions = {
//   origin: "http://localhost:5500",
// };
// app.use(cors(corsOptions));

app.use(cors());
// CORS policy configuration
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");

//   //returning ok for preflight request
//   if ((req.method = "OPTIONS")) {
//     return res.sendStatus(200);
//   }
//   next();
// });

//middlewares
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use(bodyParser.json());
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", jwtAuth, cartRouter);

app.get("/", (req, res) => {
  res.send("response from the server");
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
});
