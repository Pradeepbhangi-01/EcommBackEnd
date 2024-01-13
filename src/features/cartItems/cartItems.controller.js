import CartItemsModel from "./cartItems.model.js";

export default class CartItemsController {
  addCartItems(req, res) {
    const { productID, quantity } = req.query;
    const userID = req.userID;
    const item = CartItemsModel.addCartItems(productID, userID, quantity);
    if (!item) {
      res.status(401).send("Unauthorized");
    } else {
      res.status(201).json({ item });
    }
  }

  getUserCartItems(req, res) {
    const userID = req.userID;
    const cartItems = CartItemsModel.getUserCartItems(userID);
    if (!cartItems) {
      res.status(401).send("no cart items");
    } else {
      res.status(200).json(cartItems);
    }
  }

  deleteCartItem(req, res) {
    const cartID = req.params.id;
    const userID = req.userID;
    const error = CartItemsModel.deleteCartItem(userID, cartID);
    if (error) {
      return res.status(400).send(error);
    }
    return res.status(200).send("cart item deleted");
  }
}
