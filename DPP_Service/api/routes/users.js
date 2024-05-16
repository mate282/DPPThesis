const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/login',usersController.login_user);

module.exports= router;