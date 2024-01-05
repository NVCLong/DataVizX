const express = require("express");
const router = express.Router();
const upload = require('../helpers/multer');
const userProfileController = require('../controllers/userProfileController');

router.post('/upload', upload.single('image'), userProfileController.uploadImage);

module.exports = router;