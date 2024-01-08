const express = require("express");
const router = express.Router();
const chartSortingController = require("../controllers/chartSortingController");
const jwt_helpers = require('../helpers/jwt_helper')

router.get("/asc/:name", chartSortingController.performSortAsc);
router.get("/desc/:name", jwt_helpers.verifyAccessToken, chartSortingController.performSortDesc);


module.exports = router;
