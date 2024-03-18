const express = require("express");
const {
  addCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categories");

const router = express.Router();

router.post("/", addCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);

module.exports = router;
