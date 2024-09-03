const mongoose = require("mongoose");

const ACLSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  access_to: { type: String, required: true },
});

module.exports = mongoose.model("ACL", ACLSchema);
