const express = require("express");
const {
  addCategory,
  getCategory,
  getAllCategories,
  deleteCategory,
  updateCategory
} = require("../controllers/categories");

const router = express.Router();

router.post("/", addCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);
router.put('/:id',updateCategory)

module.exports = router;
