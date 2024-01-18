import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handling/applicationerror.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  //1. adding data to the database
  async addProduct(product) {
    try {
      //1. connect to the database
      const db = getdb();
      //2. create the collection
      const collection = db.collection(this.collection);

      //3. add the products

      await collection.insertOne({ product });
      return product;
    } catch (error) {
      throw new ApplicationError("Something went wrong");
    }
  }

  async getAll() {
    try {
      const db = getdb();
      //2. create the collection
      const collection = db.collection(this.collection);

      //3. add the products

      const products = await collection.find().toArray();
      return products;
    } catch (error) {
      throw new ApplicationError("Something went wrong");
    }
  }

  async get(id) {
    try {
      const db = getdb();
      //2. create the collection
      const collection = db.collection(this.collection);

      //3. add the products

      const products = await collection.findOne({ _id: new ObjectId(id) });
      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong");
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getdb();
      const collection = db.collection(this.collection);

      let filerExpression = {};
      if (minPrice) {
        filerExpression.price = { $gte: parseFloat(minPrice) };
      }

      if (maxPrice) {
        filerExpression.price = {
          ...filerExpression.price,
          $gte: parseFloat(maxPrice),
        };
      }

      if (category) {
        filerExpression.category = category;
      }

      return collection.find(filerExpression).toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong");
    }
  }

  async rateProduct(userId, productID, rating) {
    try {
      const db = getdb();
      const collection = db.collection(this.collection);
      //1 pulling the existing entry
      collection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $pull: { ratings: { userID: new ObjectId(userId), rating } },
        }
      );

      //2. this will update   the rating
      collection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $push: { ratings: { userID: new ObjectId(userId), rating } },
        }
      );
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default ProductRepository;
