const express = require("express");
const AuthenticationController = require("../controllers/authenticationController");
const router = express.Router();

// Register route
router.post("/register", AuthenticationController.register);

// Login route
router.post("/login", AuthenticationController.login);

// Logout route
router.post("/logout", AuthenticationController.logout);

// Delete logout route

// Test route
// router.get("/getAllUser", AuthenticationController.getAllUser);

// Test route
// router.get("/getAllUser", AuthenticationController.getAllUser);

module.exports = router;
