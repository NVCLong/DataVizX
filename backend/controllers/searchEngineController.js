const express = require("express");
const router = express.Router();
const collection = require("../models/collection.model.js");

const searchEngineController = {
    async searchEngine(req, res) { // Correct order of req and res parameters
        try {
            const searchText = req.query.q;
            if (!searchText) {
                return res.status(400).json({
                    error: "Search text is required",
                });
            }

            const Collections = await collection.find(
                { $text: { $search: searchText } },
                { score: { $meta: "textScore" } } // If you want to sort by text score
            );

            res.json(Collections);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = searchEngineController;
