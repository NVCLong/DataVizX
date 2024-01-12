const express = require("express");
const router = express.Router();
const collectionFeaturesController = require("../controllers/collectionFeaturesController");
const jwt_helpers = require('../helpers/jwt_helper')

router.get("/asc/:id", collectionFeaturesController.performSortAsc);
router.get("/desc/:id", collectionFeaturesController.performSortDesc);
router.post("/search/:id", collectionFeaturesController.performSearch);

module.exports = router;
