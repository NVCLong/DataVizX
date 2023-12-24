const express= require("express")
const router= express.Router();
const collectionController= require('../controllers/collectionController');
const jwt_helpers= require('../helpers/jwt_helper')

router.get('/:id',jwt_helpers.verifyAccessToken ,collectionController.getCollectionDetails)
router.post('/add',jwt_helpers.verifyAccessToken  ,collectionController.addNewCollection)
router.put("/edit/:id",jwt_helpers.verifyAccessToken  ,collectionController.updateCollection)
router.get('/groupData/:id', jwt_helpers.verifyAccessToken ,collectionController.groupingData)



module.exports =  router