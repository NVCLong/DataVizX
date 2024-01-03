const express = require("express");
const AuthenticationController = require("../controllers/authenticationController");
const router = express.Router();

// Register route
router.post("/register", AuthenticationController.register);

// Login route
router.post("/login", AuthenticationController.login);

// Logout route
router.post("/logout", AuthenticationController.logout);

// Refresh token route
router.post("/refresh-token", AuthenticationController.refreshToken);

// Delete logout route
router.delete("/logout", AuthenticationController.logout);

// Test route
// router.get("/getAllUser", AuthenticationController.getAllUser);

module.exports = router;
