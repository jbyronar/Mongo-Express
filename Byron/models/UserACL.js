const mongoose = require("mongoose");

const UserACLSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  acl_id: { type: String, required: true },
});

module.exports = mongoose.model("UserACL", UserACLSchema);
