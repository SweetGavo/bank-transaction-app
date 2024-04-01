import mongoose from "mongoose";
import { Transaction } from "../transactions/transaction/transaction.schema";


export const userSchema = new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
cpf:{type:String,required:true},
age:{type:Number,required:true},
transaction:[] 

})



export interface User{

    id:Number
    name:String
    email:String
    cpf:String
    age:Number
    transaction: Transaction []

}

export const UserModel = mongoose.model('User', userSchema);