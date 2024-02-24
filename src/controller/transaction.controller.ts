// transaction.controller.ts
import { Request, Response } from 'express';
import { Transaction, TransactionModel } from '../model/transaction.model';

class TransactionController {
  static async deposit(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      const transaction = await TransactionModel.create({ type: 'deposit', amount });
      res.json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async withdrawal(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      const transaction = await TransactionModel.create({ type: 'withdrawal', amount });
      res.json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async transfer(req: Request, res: Response) {
    try {
      const { amount, from, to } = req.body;
      const transaction = await TransactionModel.create({ type: 'transfer', amount, from, to });
      res.json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { TransactionController };
