const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  role_id: { type: String, required: true },
  user_id: { type: String, required: true },
});

module.exports = mongoose.model("UserRole", UserRoleSchema);
