const express= require ('express');
const router= express.Router();
const reportController= require('../app/Controller/ReportController')


router.post('/store/:id',reportController.storeReport)
router.get('/',reportController.reportForm)




module.exports=router