import ProductModel from "../product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.GetAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };

    const product = ProductModel.add(newProduct);
    res.status(201).send(product);
  }

  rateProducts(req, res) {
    const { userId, productId, rating } = req.query;
    ProductModel.rateProduct(userId, productId, rating);
    return res.status(200).send("rating is added");
  }

  filterProducts(req, res) {
    console.log("execution reached here");
    const { minPrice, maxPrice, category } = req.query;
    const result = ProductModel.filterProducts(minPrice, maxPrice, category);

    if (!result) {
      res.status(404).send("products not found");
    } else {
      res.status(200).send(result);
    }
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getOneProduct(id);
    if (!product) {
      res.status(404).send("Product not is found");
    }
    {
      res.status(200).send(product);
    }
  }
}
