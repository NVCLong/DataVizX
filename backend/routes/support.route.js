const express= require('express')
const router= express.Router();
const supportController= require('../controllers/supportController')

router.post("/post",supportController.getRequest)



module.exports= router