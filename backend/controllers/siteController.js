const express = require("express");
const chartList= require("../models/chartlist.model")
const User = require("../models/user.model")

class SiteController {
    //[GET] /
    homePage(req, res) {
        res.json({ success: true, message: "Welcome to DataVizX" });
    }

    // [GET] /charlist
    async chartListPage(req, res) {
        try{
            const user= User.findOne({userId: req.cookies.userId});

        }catch(e){
            console.log("error: "+ e);
        }
    }
}
module.exports = new SiteController();
