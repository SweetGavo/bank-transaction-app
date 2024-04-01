import { User } from 'src/module/user/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, transactionSchema } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction') private transactionModel: Model<Transaction>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createTransaction(userId: string, transaction: any): Promise<Transaction> {
    try {
      const createdTransaction = await this.transactionModel.create({
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
        userId: userId, // Assuming userId is required in the transaction document
      });

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.transaction.push(createdTransaction);
      await user.save();

      return createdTransaction;
    } catch (error) {
      throw new NotFoundException('Error creating transaction');
    }
  }

  async getTransaction(userId: string, transactionId: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionModel.findOne({
        _id: transactionId,
        userId: userId,
      });
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw new NotFoundException('Error fetching transaction');
    }
  }

  async getAllTransactions(userId: string): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionModel.find({ userId: userId });
      return transactions;
    } catch (error) {
      throw new NotFoundException('Error fetching transactions');
    }
  }

  async updateTransaction(
    userId: string,
    transactionId: string,
    transactionData: any,
  ): Promise<Transaction> {
    try {
      const updatedTransaction = await this.transactionModel.findOneAndUpdate(
        { _id: transactionId, userId: userId },
        transactionData,
        { new: true },
      );
      if (!updatedTransaction) {
        throw new NotFoundException('Transaction not found');
      }
      return updatedTransaction.save();
    } catch (error) {
      throw new NotFoundException('Error updating transaction');
    }
  }

  async deleteTransaction(userId: string, transactionId: string): Promise<Transaction> {
    try {
      const deletedTransaction = await this.transactionModel.findOneAndDelete({
        _id: transactionId,
        userId: userId,
      });
      if (!deletedTransaction) {
        throw new NotFoundException('Transaction not found');
      }
      return deletedTransaction;
    } catch (error) {
      throw new NotFoundException('Error deleting transaction');
    }
  }
}
