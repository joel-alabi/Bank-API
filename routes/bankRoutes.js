const express =require('express')
const router = express.Router();
const {listBankController,createBankController,updateBankController,deleteBankController}  = require('../controllers/bankController');
const {body} = require('express-validator');
const BankModel = require('../models/bankModel');
const isAuth = require('../middlewares/is-auth');



router.get('/bank/:id?',isAuth,listBankController);

 router.post('/bank',isAuth,[
     body('name').trim().not().isEmpty().withMessage('Name cannot be empty'),
     body ('location').trim().not().isEmpty().withMessage('Location cannot be empty'),
     body('branch').trim().not().isEmpty().withMessage('Branch cannot be empty'),
    body('phone').isMobilePhone("en-GH")
    .custom((value ,{req})=>{
        return BankModel.findOne({'phone':value}).then(
    bankDoc =>{
        if(bankDoc)
        return Promise.reject('phone number is already taken');
         }  
        )
    }) 

    ],createBankController);
 router.put('/bank',isAuth,updateBankController);
 router.delete('/bank',isAuth,deleteBankController);

 module.exports = router;