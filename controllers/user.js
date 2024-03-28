const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(req, res) {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      street: req.body.street,
      country: req.body.country,
    });
    user = await user.save();
    if (!user) {
      return res
        .status(422)
        .send("The user cannot be created due to invalid data!");
    }
    res.status(201).send(user);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res
        .status(404)
        .json({ message: "The user with the given ID was not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const usersList = await User.find().select("-passwordHash");
    if (!usersList || usersList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    res.status(200).json(usersList);
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("The user not found");
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).send({ user: user.email, token });
    }
    return res.status(400).send("wrong password");
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = { registerUser, getAllUsers, getUser, loginUser };
