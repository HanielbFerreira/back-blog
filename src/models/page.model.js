const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  title: { type: String },
  photo: { type: String },
  message: { type: String }
});

module.exports = mongoose.model("Page", PageSchema);
