import { UserService } from './../../user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
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

      return this.transactionService.createTransaction(id, newTransaction);
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
        throw new NotFoundException('User not found in database');
      }

      const transaction = await this.transactionService.getTransaction(id,idTransaction);
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return transaction;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Get a specific transaction for the specified user
  // @Get(':transactionId')
  // async getTransaction(@Param('id') id: string, @Param('transactionId') transactionId: string): Promise<Transaction> {
  //   try {
  //     const user = await this.userService.getById(id);
  //     if (!user) {
  //       throw new NotFoundException('User not found in database');
  //     }

  //     const transaction = await this.transactionService.getTransaction(id, transactionId);
  //     if (!transaction) {
  //       throw new NotFoundException('Transaction not found');
  //     }

  //     return transaction;
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }

  // Get all transactions for the specified user
  @Get()
  async getTransactions(
    @Param('id') id: string,
    @Param('transactionId') transactionId: string,
  ): Promise<Transaction[]> {
    try {
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundException('User not found in database');
      }

      const transactions = await this.transactionService.getAllTransactions(id)
      if (!transactions) {
        throw new NotFoundException('Transactions not found');
      }

      return transactions;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Update a specific transaction for the specified user
  @Put(':transactionId')
  // async updateTransaction(
  //   @Param('id') id: string,
  //   @Param('transactionId') transactionId: string,
  //   @Body() dto: any,
  // ): Promise<Transaction> {
  //   try {
  //     const { title, value, type } = dto;
  //     if (!title || !value || !type) {
  //       throw new NotFoundException('Unfilled data');
  //     } else if (type !== 'income' && type !== 'outcome') {
  //       throw new NotFoundException('Transaction type is not valid');
  //     }

  //     const user = await this.userService.getById(id);
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }

  //     const transaction = await this.transactionService.getTransaction(
  //       id,
  //       transactionId,
  //     );
  //     if (!transaction) {
  //       throw new NotFoundException('Transaction not found');
  //     }

  //     transaction.title = title;
  //     transaction.value = value;
  //     transaction.type = type;

  //     await transaction.save();

  //     return transaction;
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }



  async updateTransaction(
    @Param('id') id: string,
    @Param('transactionId') transactionId: string,
    @Body() dto: any,
  ): Promise<Transaction> { // Use the Mongoose model type here
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

      const transaction = await this.transactionService.updateTransaction(id,transactionId,dto);
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      transaction.title = title;
      transaction.value = value;
      transaction.type = type;

      await transaction; 

      return transaction;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  // Delete a specific transaction for the specified user
  @Delete(':transactionId')
  async deleteTransaction(
    @Param('id') id: string,
    @Param('transactionId') transactionId: string,
  ): Promise<Transaction> {
    try {
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const transaction = await this.transactionService.deleteTransaction(id,transactionId)
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return transaction;

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
