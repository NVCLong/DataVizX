const express = require("express");
const router = express.Router();
const siteController= require("../controllers/siteController")
const {verifyAccessToken} = require("../helpers/jwt_helper")
router.get('/', verifyAccessToken,siteController.homePage )

module.exports = router