import express from "express";
import ProductController from "../controller/product.controller.js";
import { upload } from "../../../middleware//fileupload.middleware.js";

const productController = new ProductController();
// Initilize router

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/add", upload.single("imageUrl"), productController.addProduct);
router.get("/product/:id", productController.getOneProduct);
router.get("/filter", productController.filterProducts);

export default router;
