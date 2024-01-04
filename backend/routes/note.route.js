const express = require('express');
const router= express.Router();
const noteController= require('../controllers/noteController')
const jwt_helpers = require('../helpers/jwt_helper');

router.post("/create/:id",jwt_helpers.verifyAccessToken ,noteController.createNote)
router.get("/getNote/:id",jwt_helpers.verifyAccessToken ,noteController.getNote)
router.put("/editNote/:id",jwt_helpers.verifyAccessToken ,noteController.editNote)


module.exports = router