const Category = require("../model/category");

async function addCategory(req, res) {
  try {
    const { name, icon, color } = req.body;
    if (!name || !icon || !color) {
      return res.status(400).send("All fields are required");
    }
    let category = new Category({ name, icon, color });
    category = await category.save();
    if (!category) {
      return res
        .status(422)
        .send("The category cannot be created due to invalid data!");
    }
    res.status(201).send(category);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getCategory(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Category Id");
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "The category with the given ID was not found" });
    }
    return res.status(200).send(category);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getAllCategories(req, res) {
  try {
    const categoryList = await Category.find();
    if (!categoryList || categoryList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }
    res.status(200).json(categoryList);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Category Id");
    }
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

async function updateCategory(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Category Id");
    }
    const { name, icon, color } = req.body;
    if (!name || !icon || !color) {
      return res
        .status(400)
        .send("All fields (name, color and icon) are required");
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        icon,
        color,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found!" });
    }
    return res.status(200).send(updatedCategory);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
module.exports = {
  addCategory,
  getCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
};
