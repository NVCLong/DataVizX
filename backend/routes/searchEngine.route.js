const express = require("express");
const router = express.Router();
const searchEngineController = require("../controllers/searchEngineController");
const jwt_helpers = require('../helpers/jwt_helper')

router.get("/:name/:value", jwt_helpers.verifyAccessToken, searchEngineController.performSearch);

module.exports = router;