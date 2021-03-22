const accountModel = require('../models/accountModel');
// const bankModel =require("../models/bankModel")


const createAccountController=(req,res)=>{
    const {accountName,accountNumber,accountType,bankId}=req.body;
    const account =new accountModel({accountName,accountNumber,accountType,bankId})
    account.save().then(result =>{
        
        res.json({message:"created successfully",data:result})

    }).catch(err => 
        console.log(error));  
}
const listAccountController=(req,res)=>{
    accountModel.find()
    .populate("bankId","name loction branch phone")
    .then( accounts =>{
        res.json({data:accounts}) 
    }).catch(err => console.log(err))
}




module.exports ={ 
    createAccountController,
    listAccountController
}