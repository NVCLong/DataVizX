const express = require('express');
const router= express.Router();

const jwt_helpers = require('../helpers/jwt_helper');


router.post('/',jwt_helpers.verifyAccessToken)
router.post('/',jwt_helpers.verifyRefreshToken)
module.exports = router