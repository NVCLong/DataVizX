const express = require("express");
const router = express.Router();
const Collection = require("../models/collection.model");
const binarySearch = require("../algorithm/binarySearch");

const searchEngineController = {
    async performSearch(req, res) {
        const { name, value } = req.params;
        try {
            const document = await Collection.findOne({ name });
            console.log(value);

            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            }

            const sortedValuesArray = document.values.sort((a, b) => a.value - b.value);
            const result = binarySearch(sortedValuesArray, parseInt(value), 'value');
            console.log(value);

            // console.log(object);

            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'Value not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = searchEngineController;
