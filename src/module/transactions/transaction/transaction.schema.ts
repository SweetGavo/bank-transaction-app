import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import mongoose, { Document } from 'mongoose';
export interface Transaction {
  title: String;
  value: String;
  type: String;
}



export const transactionSchema = new mongoose.Schema({
title:{type:String,required:true},
value:{type:String,required:true},
type:{type:String,required:true}
})


export const TransactionModel = mongoose.model('Transaction', transactionSchema);
