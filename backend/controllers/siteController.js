const express = require("express");
const chartList = require("../models/chartlist.model")
const User = require("../models/user.model")
const Collection = require("../models/collection.model")
const mongooseHelper = require("../utils/mongooseHelper")

class SiteController {
    //[GET] /
    homePage(req, res) {
        res.json({ success: true, message: "Welcome to DataVizX" });
    }

    // [GET] /charlist
    async chartListPage(req, res) {
        try {
            await chartList.findOne({ userId: req.cookies.userId })
                .then(async function (results) {
                    const user = await User.findOne({ _id: req.cookies.userId });
                    const lists = results;
                    const listCollection = lists.DataList
                    let userCollection = []
                    for (let collection of listCollection) {
                        console.log(typeof collection)
                        let element = await Collection.findById(collection._id);
                        userCollection.push(element)
                    }
                    res.json({ success: true, chartlist: lists, user: user, collection: userCollection })
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
