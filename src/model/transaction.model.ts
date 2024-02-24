// transaction.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface Transaction {
  accountId: mongoose.Types.ObjectId;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  from?: string;
  to?: string;
}

interface TransactionDocument extends Transaction, Document {}

const transactionSchema = new Schema<TransactionDocument>({
  accountId: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  amount: { type: Number, required: true },
  from: { type: String },
  to: { type: String },
}, { timestamps: true });

const TransactionModel = mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export { Transaction, TransactionDocument, TransactionModel };
