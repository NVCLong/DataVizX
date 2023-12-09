const express = require("express");

class SiteController {
    //[GET] /
    homePage(req, res) {
        res.json({ success: true, message: "Welcome to DataVizX" });
    }
}
module.exports = new SiteController();
