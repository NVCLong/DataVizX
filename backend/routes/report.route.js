const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/all_reports", reportController.getAllReport);
router.post("/sendReport", reportController.sendReport);
router.get("/", reportController.reportForm);

module.exports = router;
