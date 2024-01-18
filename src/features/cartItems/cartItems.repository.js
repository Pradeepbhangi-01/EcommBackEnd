import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handling/applicationerror.js";

export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async addItems(productId, userId, quantity) {
    try {
      //1. db connection
      const db = getdb();

      // 2. creating the collection
      const collection = db.collection(this.collection);

      // 3. inserting the document
      const item = await collection.updateOne(
        { productId: new ObjectId(productId), userId: new ObjectId(userId) },
        {
          $inc: { quantity: quantity },
        },
        {
          upsert: true,
        }
      );
      return item;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }

  async getItems(userId) {
    try {
      //1. db connection
      const db = getdb();

      // 2. creating the collection
      const collection = db.collection(this.collection);

      // 3. inserting the document
      return await collection
        .find({
          userId: new ObjectId(userId),
        })
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }

  async deleteItems(userId, cartItemId) {
    try {
      //1. db connection
      const db = getdb();

      // 2. creating the collection
      const collection = db.collection(this.collection);

      // 3. inserting the document
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });

      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }
}
