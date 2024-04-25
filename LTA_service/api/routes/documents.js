const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');
const DocumentsController = require( '../controllers/documents');



router.post('/',checkAuth,upload.single('file'),DocumentsController.create_doc);

router.get('/:fileId',checkAuth,DocumentsController.get_doc);

module.exports = router;