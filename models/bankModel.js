const mongoose =require("mongoose")
const {Schema}=mongoose
const BankSchema = new mongoose.Schema({
    name:String,
    location:String,
    branch:String,
    address:String,
    phone:String,
    accounts:[{type:Schema.Types.ObjectId,ref:"Account"}]

})

const BankModel = mongoose.model("Bank",BankSchema)

module.exports=BankModel;

// //bank model
// let banksDb = require('./bankDataBase');

// class BankModel {
//     constructor({name,branch,location,phone,address,accountNumber}){
// this.name=name
// this.branch=branch
// this.location=location
// this.phone=phone
// this.address=address
// this.accountNumber=accountNumber
//     }
//     save(){
//      banksDb.push(this)
//      return this
//     }
//     static all(){
//         return banksDb;
//     }
//     static update(updatedInfo=[]){
//         //find bank
//     banksDb=banksDb.map(bank=>{
//     if(bank.name ===updatedInfo){
//         return{...bank,...updatedInfo};
//     }
//     return bank;
// })
//     }

//     static delete({name}){
//         let deletedBank = null;
//      banksDb=banksDb.filter(bank=>{
//     if (bank.name!== name){
//       return true ; 
//     }
//     deletedBank= bank;
//     return false;
//   });

//   return deletedBank
//     }
// }
// module.exports= BankModel;