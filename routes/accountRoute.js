const express = require('express');
const router = express.Router();
const {createAccountController,listAccountController} = require('../controllers/accountController')

router.post('/account',createAccountController);
router.get('/accounts',listAccountController)
module.exports = router;