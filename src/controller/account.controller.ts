// account.controller.ts
import { Request, Response } from 'express';
import { Account, AccountModel } from '../model/account.model';
import { TransactionModel } from 'src/model/transaction.model';
import { validationResult } from 'express-validator';
import * as winston from 'winston';

// Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

class AccountController {
  static async createAccount(req: Request, res: Response) {
    try {
   
    // Validate incoming data
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

      const { accountHolder } = req.body;
      const newAccount = await AccountModel.create({ accountHolder });
      res.json(newAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  static async getAccountDetails(req: Request, res: Response) {
    try {
      const accountId = req.params.id;

       // Validate incoming data
       if (!accountId) {
        return res.status(400).json({ error: 'Invalid account ID' });
      }

      const account = await AccountModel.findById(accountId);
      
      if (!account) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }

      res.json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async listTransactions(req: Request, res: Response) {
    try {
      const accountId = req.params.id;

      // Validate incoming data
      if (!accountId) {
        return res.status(400).json({ error: 'Invalid account ID' });
      }
      const transactions = await TransactionModel.find({ accountId });
      
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { AccountController };
