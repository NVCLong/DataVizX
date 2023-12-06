const express = require("express");
const AuthenticationController = require("../controllers/AuthenticationController");

const router = express.Router();

router.post("/register", AuthenticationController.register);

router.post("/login", AuthenticationController.login);

router.post("/logout", AuthenticationController.logout);

router.post("/refresh-token", AuthenticationController.refreshToken);

router.delete("/logout", AuthenticationController.logout);

module.exports = router;
