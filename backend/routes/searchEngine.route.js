const express = require("express");
const router = express.Router();
const searchEngineController = require("../controllers/searchEngineController");

router.get("/collections/:name/:value", searchEngineController.performSearch);

module.exports = router;