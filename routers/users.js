const express = require("express");
const { registerUser, getAllUsers, getUser ,loginUser} = require("../controllers/user");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

module.exports = router;
