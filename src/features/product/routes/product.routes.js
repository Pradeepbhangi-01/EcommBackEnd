import express from "express";
import ProductController from "../controller/product.controller.js";
import { upload } from "../../../middleware//fileupload.middleware.js";

const productController = new ProductController();
// Initilize router

const productRouter = express.Router();

productRouter.get("/", productController.getAllProducts);
productRouter.post(
  "/add",
  upload.single("imageUrl"),
  productController.addProduct
);
productRouter.get("/product/:id", productController.getOneProduct);
productRouter.get("/filter", productController.filterProducts);
productRouter.post("/rate", productController.rateProducts);

export default productRouter;
