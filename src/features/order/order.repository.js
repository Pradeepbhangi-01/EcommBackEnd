import { ObjectId } from "mongodb";
import { getClient, getdb } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getdb();

      session.startTransaction();
      //1. Get the cart items and calculate the total amount

      const items = await this.getTotalAmount(userId, session);

      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      // 2. create an order record

      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );

      await db.collection(this.collection).insertOne(newOrder, { session });

      // 3. Reduce the stock
      for (let item of items) {
        await db.collection("products").updateOne(
          {
            _id: item.productId,
          },
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }

      //       // 4. clearthe cart items.

      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) }, { session });
      session.commitTransaction();
      session.endSession();
      return;
    } catch (error) {
      await session.aborttransaction();
      console.log(error);
      throw new ApplicationError("Something went wrong");
    }
  }

  async getTotalAmount(userId, session) {
    try {
      //db connection
      const db = getdb();

      //  creating the collection
      const items = await db
        .collection("cartItems")
        .aggregate(
          [
            //1. Fet cartitems for user

            {
              $match: { userId: new ObjectId(userId) },
            },
            // 2. Get the products from products collection
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productInfo",
              },
            },
            //3. Unwind the productsinfo.
            {
              $unwind: "$productInfo",
            },
            // 4 . calculate totalAmount for each cartItems
            {
              $addFields: {
                totalAmount: {
                  $multiply: ["$productInfo.price", "$quantity"],
                },
              },
            },
          ],
          { session }
        )
        .toArray();

      return items;
    } catch (error) {
      console.log("Order repo", error);
      return error;
    }
  }
}
