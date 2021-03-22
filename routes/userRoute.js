const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const {signupController,signinController}= require('../controllers/userController')

const UserModel = require('../models/UserModel')

router.put('/signup',[
body('name').trim().not().isEmpty().withMessage('user name is required'),
body('email')
.trim()
.isEmail()
.withMessage("Email is invalid")
.custom((value,{req}) =>{
//Todos:check if email is already taken
return UserModel.findOne({email:value}).then(
    userDoc=>{
        if (userDoc)
        return Promise.reject("Email already taken")
    }
)
}),
body('password').trim().isLength({min:5})
],signupController);

router.post('/signin',[
    body('email')
    .isEmail()
    .withMessage('Email is invalid'),
    body('password').trim().isLength({min:5})

],signinController);

module.exports = router;