const upload = require("../helpers/upload");
const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const jwt_helpers = require('../helpers/jwt_helper')

router.get("/profile/:id", jwt_helpers.verifyAccessToken, userProfileController.getUserData);
router.post("/profile/upload/:id", upload.single("image"), userProfileController.imageUpload);
router.delete("/profile/delete/:id", jwt_helpers.verifyAccessToken, userProfileController.imageDelete);
module.exports = router;