const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./database");
const productRoutes = require("./routers/products");
const categoryRoutes = require("./routers/categories");
const userRoutes = require("./routers/users");
const orderRoutes = require("./routers/orders");
require("dotenv").config();

const app = express();
const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors());

// middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Routes
app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoryRoutes);
// app.use(`${api}/orders`, orderRoutes);
// app.use(`${api}/users`, userRoutes);

connectDB();
app.listen(PORT, () => console.log("server is running on port", PORT));
