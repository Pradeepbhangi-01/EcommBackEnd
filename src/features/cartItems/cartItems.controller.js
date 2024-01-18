import CartItemsModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export default class CartItemsController {
  constructor() {
    this.cartRespository = new CartItemsRepository();
  }
  async addCartItems(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    const item = await this.cartRespository.addItems(
      productId,
      userId,
      Number(quantity)
    );
    if (!item) {
      res.status(401).send("Unauthorized");
    } else {
      res.status(201).json({ item });
    }
  }

  async getUserCartItems(req, res) {
    const userId = req.userId;
    const cartItems = await this.cartRespository.getItems(userId);
    if (!cartItems) {
      res.status(401).send("no cart items");
    } else {
      res.status(200).json(cartItems);
    }
  }

  async deleteCartItem(req, res) {
    const cartItemId = req.params.id;
    const userId = req.userId;
    const error = await this.cartRespository.deleteItems(userId, cartItemId);
    if (!error) {
      return res.status(400).send(error);
    }
    return res.status(200).send("cart item deleted");
  }
}
