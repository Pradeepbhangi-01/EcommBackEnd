import express from "express";
import CartItemsController from "./cartItems.controller.js";

const cartRouter = express.Router();
const cartItemsController = new CartItemsController();

cartRouter.post("/add", cartItemsController.addCartItems);
cartRouter.delete("/:id", cartItemsController.deleteCartItem);
cartRouter.get("/user", cartItemsController.getUserCartItems);

export default cartRouter;
