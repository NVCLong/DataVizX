const express = require("express");
const chartList= require("../models/chartlist.model")
const User = require("../models/user.model")
const Collection= require("../models/collection.model")
const mongooseHelper= require("../untils/mongooseHelper")

class SiteController {
    //[GET] /
    homePage(req, res) {
        res.json({ success: true, message: "Welcome to DataVizX" });
    }

    // [GET] /charlist/:id
    async chartListPage(req, res) {
        // console.log("this is chartList page")
        try{
           await chartList.findOne({userId: req.params.id})
               .then(async function(results){
                   const user= await User.findOne({_id: req.params.id});
                   if(!user){
                    console.log("error")
                   }
                //    console.log(user)
                   const lists= results;
                //    console.log(lists)
                   const listCollection= lists.DataList
                   let userCollection= []
                   for ( let collection of listCollection) {
                    //    console.log(typeof  collection)
                       let element = await Collection.findById(collection._id);
                       userCollection.push(element)
                   }
                   res.json({ success:true, chartlist: lists, user: user , collection: userCollection  })
               })
               .catch(function(err){
                   console.log(err)
               })

        }catch(e){
            console.log("error: "+ e);
        }
    }
}
module.exports = new SiteController();
