import express from "express";
import ProductController from "../controller/product.controller.js";
import { upload } from "../../../middleware//fileupload.middleware.js";

const productController = new ProductController();
// Initilize router

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});

productRouter.post("/add", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/product/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});
productRouter.post("/rate", (req, res) => {
  productController.rateProducts(req, res);
});

export default productRouter;
