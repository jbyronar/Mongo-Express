const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  power: { type: Number },
});

module.exports = mongoose.model("Role", RoleSchema);
