const express = require('express');
const router= express.Router();
const noteController= require('../controllers/noteController')
const jwt_helpers = require('../helpers/jwt_helper');

router.post("/create/:id" ,noteController.createNote)
router.get("/getNote/:id" ,noteController.getNote)
router.put("/editNote/:id",noteController.editNote)
router.delete("/delete/:id",noteController.deleteNote)


module.exports = router