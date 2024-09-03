const mongoose = require("mongoose");

const UserSettingsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  settings: { type: Object, required: true },
});

module.exports = mongoose.model("UserSettings", UserSettingsSchema);
