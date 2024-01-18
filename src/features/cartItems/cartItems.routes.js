import express from "express";
import CartItemsController from "./cartItems.controller.js";

const cartRouter = express.Router();
const cartItemsController = new CartItemsController();

cartRouter.post("/add", (req, res) => {
  cartItemsController.addCartItems(req, res);
});
cartRouter.delete("/:id", (req, res) => {
  cartItemsController.deleteCartItem(req, res);
});
cartRouter.get("/user", (req, res) => {
  cartItemsController.getUserCartItems(req, res);
});

export default cartRouter;
