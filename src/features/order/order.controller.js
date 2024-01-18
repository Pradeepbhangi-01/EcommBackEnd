import OrderRepository from "./order.repository.js";

export default class OrderController {
  constructor() {
    this.repository = new OrderRepository();
  }

  async plcaeOrder(req, res, next) {
    try {
      const userId = req.userId;
      await this.repository.placeOrder(userId);
      res.status(201).send("order is created");
    } catch (error) {
      console.log(error);
      return res.status(200).send("something went wrong");
    }
  }
}
