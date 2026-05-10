import express from "express";
import User from "../models/user.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user status/role
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const { role, status } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
