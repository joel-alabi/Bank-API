//controllers
const accountModel = require('../models/accountModel');
const BankModel =require('../models/bankModel');
const {validationResult}=require('express-validator');
// list all banks
    const listBankController=(req,res)=>{
         const {id}=req.params;
        if(id){
            BankModel.find({_id:id}).then(banks =>{
                res.json({data:banks})
            }).catch(err => console.log(err))
        }else{
            BankModel.find().then(banks =>{
                res.json({data:banks})
            }).catch(err => console.log(err))
        }
    }
    
    //creating banks
    const createBankController=(req,res)=>{
        //validation checks
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.json({message: errors.array()[0].msg});
    }
    const {name,branch,location,phone,address,accountNumber}=req.body;
    // validation check
    const bank =new BankModel({name,branch,location,phone,address,accountNumber})
    
    bank.save().then(result =>{
        res.json({message:"created successfully",data:result})

    }).catch(err => 
        console.log(error));

    }
    //updating all bank
    const updateBankController=(req,res)=>{
        const {id,name,branch,location,phone,address,accountNumber}=req.body;
      
        BankModel.findById(id).then(bank =>{
            if(bank){
                bank.name=name;
                bank.location=location;
                bank.branch=branch;
                bank.phone=phone;
                bank.address=address;
                bank.accountNumber=accountNumber;

                bank.save();
                res.json({message:"updated successfully",data:bank})
            }
            res.json({message:"Document cannot be found",data:bank})

        }).catch(err=>console.log(err))
    //    const updatedBank= BankModel.update({name,branch,location,phone,address,accountNumber})
    //    res.json({message:"updated successfully",data:updatedBank})
    
    }

    //deleting banks
    const deleteBankController=(req,res)=>{
    const {id}=req.body;
    BankModel.findByIdAndRemove(id).then(deletedBank =>{
        if (deletedBank){
            accountModel.deleteMany({bankId:deletedBank._id})
            .then(result =>{
               res.json({message:"bank deleted successfully",data:deletedBank});
            }).catch(err => console.log(err))
    
return;
        }
    res.json({message:"bank not found"});

      })
    }

    module.exports={
        listBankController,
        updateBankController,
        createBankController,
        deleteBankController,
    }