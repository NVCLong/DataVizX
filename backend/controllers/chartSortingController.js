const express = require("express");
const router = express.Router();
const Collection = require("../models/collection.model");
const ChartSorting = require("../algorithm/chartSorting");


const chartSortingController = {
    // [GET] /chartSorting/asc/:name
    async performSortAsc(req, res) {
        const { name } = req.params;
        try {
            const document = await Collection.findOne({ name });

            if (!document) {
                return res.status(404).json({ error: "Collection not found!" });
            }

            const sortedValuesArray = ChartSorting.sortByValueAndCategoryAsc(
                document.values
            );
            res.json(sortedValuesArray);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    // [GET] /chartSorting/desc/:name
    async performSortDesc(req, res) {
        const { name } = req.params;
        try {
            const document = await Collection.findOne({ name });

            if (!document) {
                return res.status(404).json({ error: "Collection not found!" });
            }

            const sortedValuesArray = ChartSorting.sortByValueAndCategoryDesc(
                document.values
            );
            res.json(sortedValuesArray);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = chartSortingController;
