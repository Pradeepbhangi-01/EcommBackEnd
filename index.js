import express from "express";
const app = express();
import productRouter from "./src/features/product/routes/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import bodyParser from "body-parser";
// import basicAuth from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwtAuth.middleware.js";
//middlewares
app.use(bodyParser.json());
app.use("/api/product", jwtAuth, productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", jwtAuth, cartRouter);

app.get("/", (req, res) => {
  res.send("response from the server");
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
