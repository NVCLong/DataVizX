const express = require("express");
const chartController = require("../controllers/chartController");

const router = express.Router();

router.get("/display", chartController.getChartData);

module.exports = router;