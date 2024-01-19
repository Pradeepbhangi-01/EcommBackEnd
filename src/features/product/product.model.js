import UserModel from "../user/user.model.js";
import ApplicationError from "../../error-handling/applicationerror.js";
export default class ProductModel {
  constructor(
    name,
    desc,
    price,
    imageUrl,
    categories,
    sizes,
    rating,
    stock,
    id
  ) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.categories = categories;
    this.sizes = sizes;
    this.ratings = rating;
    this.stock = stock;
    this._id = id;
  }

  static GetAll() {
    return products;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static getOneProduct(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }

  static filterProducts(minPrice, maxPrice, category) {
    const result = products.filter((i) => {
      return (
        (!minPrice || i.price >= minPrice) &&
        (!maxPrice || i.price <= maxPrice) &&
        (!category || i.category == category)
      );
    });

    return result;
  }

  static rateProduct(userId, productId, rating) {
    // 1. check the user exist or not

    const user = UserModel.getAllUsers().find((u) => u.id == userId);

    if (!user) {
      throw new ApplicationError("user not found", 400);
    }

    // 2. check whether product if found or not

    const product = products.find((p) => p.id == productId);
    if (!product) {
      throw new ApplicationError("product not found", 400);
    }

    // 3. check whether rating arrayis prsent or not

    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({
        userId,
        rating,
      });
    } else {
      // 3.1 check whether the user has the rating or not
      const existingRatingIndex = product.ratings.findIndex(
        (r) => (r.userId = userId)
      );

      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userId: userId,
          rating: rating,
        };
      } else {
        product.ratings.push({
          userId: userId,
          rating: rating,
        });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Cateogory1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Cateogory2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Cateogory3",
    ["M", "XL", "S"]
  ),
];
