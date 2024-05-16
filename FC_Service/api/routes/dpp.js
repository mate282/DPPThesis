const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const DppController = require('../controllers/dpp')



router.post('/',checkAuth,DppController.register_doc);

router.get('/:dppId',DppController.get_doc_links);

module.exports = router;