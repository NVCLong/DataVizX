const express= require("express")
const router= express.Router();
const collectionController= require('../controllers/collectionController');
const jwt_helpers= require('../helpers/jwt_helper')

//;route cannot return
router.get('/:id',jwt_helpers.verifyAccessToken ,collectionController.getCollectionDetails)
router.post('/add',jwt_helpers.verifyAccessToken  ,collectionController.addNewCollection)
router.get('/groupData/:id', jwt_helpers.verifyAccessToken ,collectionController.groupingData)
router.put("/edit/:id",jwt_helpers.verifyAccessToken, collectionController.editCollection)
router.get('/statistic/:id', jwt_helpers.verifyAccessToken ,collectionController.statistic)
router.post("/searchValues/:id",jwt_helpers.verifyAccessToken, collectionController.searchValues)
router.delete("/delete/:id", jwt_helpers.verifyAccessToken, collectionController.deleteCollection)

module.exports =  router
