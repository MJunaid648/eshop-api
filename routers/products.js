const express = require("express");
const { addProduct ,getAllProducts} = require("../controllers/product");

const router = express.Router();

router.post("/", addProduct);
router.get('/',getAllProducts)

module.exports = router;
