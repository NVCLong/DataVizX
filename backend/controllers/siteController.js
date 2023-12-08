const express = require("express");






class SiteController{
    //[GET] /
    homePage(req, res){
        res.json({success:true, message:"welcome to dataVizX"})
    }

}
module.exports= new SiteController();