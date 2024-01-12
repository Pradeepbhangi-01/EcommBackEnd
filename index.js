import express from "express";
const app = express();
import ProductRouter from "./src/features/product/routes/product.routes.js";
import bodyParser from "body-parser";

//middlewares
app.use(bodyParser.json());
app.use("/api/products", ProductRouter);

app.get("/", (req, res) => {
  res.send("response from the server");
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
