import { User } from 'src/module/user/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, transactionSchema } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<Transaction>,
    @InjectModel('User')  private userModel: Model<User>,
  ) {}


  
  async createTransaction(
    userId: string,
    transaction: any,
  ): Promise<Transaction> {
    try {
      const createdTransaction = await this.transactionModel.create({
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
      });

      const user = await this.userModel.findById(userId);
      if (user) {
        // Add the new transaction to the user's transactions array
        user.transaction.push(createdTransaction);
        await user.save(); // Save the updated user
      }

      return createdTransaction;
    } catch (error) {
      throw new NotFoundException('Error creating transaction');
    }
  }



  async getTransaction(
    userId: string,
    transactionId: string,
  ): Promise<Transaction> {
    try {
      const transaction = await this.transactionModel
        .findOne({ _id: transactionId, userId: userId })
        .exec();
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw new NotFoundException('Error fetching transaction');
    }
  }

  // Add methods for getting all transactions, updating, and deleting transactions as needed
}
