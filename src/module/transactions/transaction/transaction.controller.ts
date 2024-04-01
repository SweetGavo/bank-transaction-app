import { UserService } from './../../user/user.service';
import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  Transaction,
  transactionSchema,
  TransactionModel,
} from './transaction.schema';
import { User } from 'src/module/user/user.schema';
import { TransactionService } from './transaction.service';
import { log } from 'console';

@Controller()
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
  ) {}

  @Post(':id/transaction')
  async createTransaction(@Param('id') id: string, @Body() dto: any) {
    try {
      const { title, value, type } = dto;
      if (!title || !value || !type) {
        throw new NotFoundException('Unfilled data');
      } else if (type !== 'income' && type !== 'outcome') {
        throw new NotFoundException('Transaction type is not valid');
      }
  
      const user = await this.userService.getById(id);
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // if (!user.transaction || !Array.isArray(user.transaction)) {
      //   throw new NotFoundException('User transactions array is invalid');
      // }
  
      const newTransaction = new TransactionModel({
        title: title,
        value: value,
        type: type,
      });
  
      user.transaction.push(newTransaction);
        
      // Save the updated user object back to the database or update transactions separately
  
      return this.transactionService.createTransaction(
        id,
        newTransaction,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  
  

  @Get(':id/transactions/:idTransaction')
  async getTransaction(
    @Param('id') id: string,
    @Param('idTransaction') idTransaction: string,
  ): Promise<Transaction> {
    try {
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const transaction = await this.transactionService.getTransaction(
        id,
        idTransaction,
      );
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return transaction;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Other methods (getTransactions, updateTransaction, deleteTransaction) can follow a similar pattern
}
