const UserModel = require('../models/UserModel');
const {validationResult} =require('express-validator')
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupController=(req,res)=>{

     //validation checks
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         console.log(errors);
         return res.json({message: errors.array()[0].msg});
     }
     
    const {name,email,password} = req.body;

    bcrypt.hash(password,10).then(hashedPassword=>{
    
    const user = new UserModel({name,email,password:hashedPassword});

    user.save().then(user =>{
        res.json({"message":"signup successful","data":{name:user.name,email:user.email}})
    }).catch(err =>console.log(err))
}).catch(err =>console.log(err))
}

const signinController = async (req,res)=>{

    try {
         const errors =validationResult(req);
         
    if(!errors.isEmpty()){
        return res.json({message:errors.array()[0].msg});
    }
    const {email,password}= req.body;
    //find user 
   const user = await UserModel.findOne({email});

   if(!user){
    return res.json({message:"user not found"}); 
   }
    // compare Words
    const isAuth = await bcrypt.compare(password,user.password);
   
    if(!isAuth){
    return res.json({message:"Email and Password combination is incorrect"});
   }

  const token= jwt.sign(
      {name:user.name,email:user.email,userId:user._id},
      'supersecretkeythatcannotbe easilyquessed',
      {expiresIn:"1h"});
   return res.json({message:"user signed in",token});

} catch (error) {
    res.json({message:"server error. please try again"});
    }

}
module.exports = {
    signupController,
    signinController
}