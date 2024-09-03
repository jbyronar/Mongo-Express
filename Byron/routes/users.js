const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// List Users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update User
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedUser);
});

// Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(204).send();
});

// Read User Settings (this route will need to be implemented)
router.get("/:id/settings", (req, res) => {
  // Implement logic to read user settings
});

// Update User Settings (this route will need to be implemented)
router.put("/:id/settings", (req, res) => {
  // Implement logic to update user settings
});

module.exports = router;
