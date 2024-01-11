const upload = require("../helpers/upload");
const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/userProfileController");
const jwt_helpers = require('../helpers/jwt_helper')

router.get("/:id", userProfileController.getUserData);
router.post("/profile/upload/:id", upload.single("image"), userProfileController.imageUpload);
router.post("/profile/delete/:id", userProfileController.imageDelete);
module.exports = router;
