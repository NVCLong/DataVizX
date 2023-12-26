const express = require("express");
const router = express.Router();
const searchEngineController = require("../controllers/searchEngineController");

router.get("/collections", searchEngineController.searchEngine);

module.exports = router;