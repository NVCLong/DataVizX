const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.get("/", siteController.homePage);
router.get("/chartList", verifyAccessToken, siteController.chartListPage);
module.exports = router;
