const express = require("express");
const chartList = require("../models/chartlist.model")
const User = require("../models/user.model")
const mongooseHelper = require("../utils/mongooseHelper")

class SiteController {
    //[GET] /
    homePage(req, res) {
        res.json({ success: true, message: "Welcome to DataVizX" });
    }

    // [GET] /charlist
    async chartListPage(req, res) {
        try {
            await chartList.find({ userId: req.cookies.userId })
                .then(function (results) {
                    const lists = results;
                    res.json({ success: true, chartlist: lists })
                })
                .catch(function (err) {
                    console.log(err)
                })

        } catch (e) {
            console.log("error: " + e);
        }
    }
}
module.exports = new SiteController();
