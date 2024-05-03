const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const DppController = require('../controllers/dpp')



router.post('/',checkAuth,DppController.create_doc);

router.get('/public/:dppId',DppController.get_public_doc);

router.get('/restricted/:dppId',checkAuth,DppController.get_restricted_doc);

module.exports = router;