const mongoose = require("mongoose");

const teamMember = new mongoose.Schema({
  name: { type: String },
});
module.exports = mongoose.model("TeamMember", teamMember);
