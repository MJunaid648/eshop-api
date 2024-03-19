const express = require("express");
const {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeatured
  
} = require("../controllers/product");

const router = express.Router();

router.post("/", addProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/get/count", getProductCount);
router.get("/get/featured/:count", getFeatured);

module.exports = router;
