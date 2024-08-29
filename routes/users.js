const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const User = require("../models/User");
const router = express.Router();

// Get all users (admin only)
router.get("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Failed to log out" });
    }

    // Optionally, clear the cookie here
    res.clearCookie("connect.sid"); // Adjust the cookie name if different
    res.redirect("/login.html"); // Redirect to login page or home page
  });
});

module.exports = router;
