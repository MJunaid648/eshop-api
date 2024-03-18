const Product = require("../model/product");

async function addProduct(req, res) {
  const { name, image, countInStock } = req.body;

  if (!name || !image || !countInStock) {
    return res.status(500).send("All fields are required");
  }

  let product = new Product({ name, image, countInStock });
  product = await product.save();

  if (!product) {
    return res.status(404).send("The product cannot be added!");
  }

  res.status(201).send(product);
}

async function getAllProducts(req, res) {
  console.log("getting");
  const products = await Product.find();

  if (!products) {
    return res.status(500).json({ success: false });
  }

  res.status(200).json(products);
}

module.exports = { addProduct, getAllProducts };
