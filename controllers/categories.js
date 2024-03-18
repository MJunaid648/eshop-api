const Category = require("../model/category");

async function addCategory(req, res) {
  const { name, icon, color } = req.body;

  if (!name || !icon || !color) {
    return res.status(500).send("All fields are required");
  }

  let category = new Category({ name, icon, color });
  category = await category.save();

  if (!category) {
    return res.status(404).send("The category cannot be created!");
  }

  res.status(201).send(category);
}

async function getAllCategories(req, res) {
  const categoryList = await Category.find();

  if (!categoryList) {
    return res.status(500).json({ success: false });
  }

  res.status(200).json(categoryList);
}

async function deleteCategory(req, res) {
    try {
      let deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found!" });
      }
  
      return res
        .status(200)
        .json({ success: true, message: "Category deleted successfully!" });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
  

module.exports = { addCategory, getAllCategories, deleteCategory };
