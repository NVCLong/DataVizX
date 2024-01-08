const express = require("express");
const router = express.Router();
const collectionSortingController = require("../controllers/collectionSortingController");
const jwt_helpers = require('../helpers/jwt_helper')

router.get("/sort/asc/:id", jwt_helpers.verifyAccessToken, collectionSortingController.performSortAsc);
router.get("/sort/desc/:id", jwt_helpers.verifyAccessToken, collectionSortingController.performSortDesc);


module.exports = router;
