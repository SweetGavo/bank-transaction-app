// routes.ts
import express from 'express';
import { body, param } from 'express-validator';
import { TransactionController } from '../controller/transaction.controller';
import { AccountController } from '../controller/account.controller';
import { register, collectDefaultMetrics } from 'prom-client';

const router = express.Router();

router.post('/deposit', TransactionController.deposit);
router.post('/withdrawal', TransactionController.withdrawal);
router.post('/transfer', TransactionController.transfer);

// account routes
router.post('/accounts', [
    body('accountHolder').isString().notEmpty(),
  ],AccountController.createAccount);

router.get('/accounts/:id',[
    param('id').isMongoId(),
  ], AccountController.getAccountDetails);


router.get('/accounts/:id/transactions',[
    param('id').isMongoId(),
  ], AccountController.listTransactions);


  // Metrics endpoint for Prometheus
router.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
  });
  
collectDefaultMetrics();


export { router };
