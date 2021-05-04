const mongoose = require("mongoose");

const Categories = mongoose.model(
  "Categories",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Categories;
