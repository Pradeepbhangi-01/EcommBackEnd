import { ObjectId } from "mongodb";
import { getdb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handling/applicationerror.js";
import ReviewModel from "./productReview.schema.js";
import ProductModel from "./product.schema.js";
import CategoryModel from "./category.schema.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  //1. adding data to the database
  async addProduct(productData) {
    try {
      productData.categories = productData.categories.split(",");
      //1. adding the product
      const newProduct = new ProductModel(productData);
      const savedProduct = await newProduct.save();

      //2. Update the categories
      await CategoryModel.updateMany(
        {
          _id: { $in: productData.categories },
        },
        { $push: { products: new ObjectId(savedProduct._id) } }
      );
    } catch (error) {
      console.log(error);
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

  async rateProduct(userId, productId, rating) {
    try {
      // adding the product using the moongoose
      const productToUpdate = await ProductModel.findById(productId);
      if (!productToUpdate) {
        throw new Error("Product does not exist");
      }

      //Find the exisiting review
      const userReview = await ReviewModel.findOne({
        productId: new ObjectId(productId),
        userId: new ObjectId(userId),
      });

      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (error) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default ProductRepository;
