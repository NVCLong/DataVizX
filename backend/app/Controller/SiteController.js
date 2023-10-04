

 class SiteController{
    //[GET]  /
      homePage(req,res){
          res.json({success:true,
          msg: 'This is home page'})
     }
 }

 module.exports = new SiteController();