const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  type: { type: String },
  name: { type: String },
  createdOn: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Image", imageSchema);
