const Category = require("../model/category");
const Product = require("../model/product");
const mongoose = require("mongoose");

async function addProduct(req, res) {
  try {
    const category = await Category.findById;
    req.body.category;
    if (!category) {
      return res.status(400).send("Invalid Category");
    }
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();
    if (!product) {
      return res.status(400).send("The product cannot be created!");
    }
    res.status(201).send(product);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getProduct(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product with given ID found" });
    }
    res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const products = await Product.find(filter);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "The Product canot be updated!" });
    }
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    let deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getProductCount(req, res) {
  try {
    let productCount = await Product.countDocuments();
    if (!productCount) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ productCount });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getFeatured(req, res) {
  try {
    const count = req.params.count ? req.params.count : 0;
    let products = await Product.find({ isFeatured: true }).limit(+count);
    if (!products) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeatured,
};
