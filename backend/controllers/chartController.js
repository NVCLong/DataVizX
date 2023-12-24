const ChartModel = require('../models/collection.model');

exports.getChartData = async (req, res) => {
    try {
        const charts = await ChartModel.find();
        res.json(charts);
        console.log("Get chart data successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};