import ProductModel from "../product.model.js";
import ProductRepository from "../product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    const products = await this.productRepository.getAll();
    res.status(200).send(products);
  }

  async addProduct(req, res) {
    const { name, desc, price, sizes, category, stock } = req.body;
    const product = new ProductModel(
      name,
      desc,
      parseFloat(price),
      req.file.filename,
      category,
      sizes.split(","),
      stock
    );
    const addProduct = await this.productRepository.addProduct(product);
    res.status(201).send(addProduct);
  }

  async rateProducts(req, res) {
    try {
      const userId = req.userId;
      const { productId, rating } = req.body;
      await this.productRepository.rateProduct(userId, productId, rating);
      return res.status(200).send("rating is added");
    } catch (error) {
      console.log("product controller", error);
      return res
        .status(500)
        .send("Error in registering the updating the product in database");
    }
  }

  async filterProducts(req, res) {
    console.log("execution reached here");
    const { minPrice, maxPrice, category } = req.query;
    const result = await this.productRepository.filter(
      minPrice,
      maxPrice,
      category
    );

    if (!result) {
      res.status(404).send("products not found");
    } else {
      res.status(200).send(result);
    }
  }

  async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await this.productRepository.get(id);
    if (!product) {
      res.status(404).send("Product not is found");
    }
    {
      res.status(200).send(product);
    }
  }
}
