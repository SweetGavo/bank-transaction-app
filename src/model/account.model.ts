// account.model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface Account {
  accountHolder: string;
  balance: number;
}

interface AccountDocument extends Account, Document {}

const accountSchema = new Schema<AccountDocument>({
  accountHolder: { type: String, required: true },
  balance: { type: Number, default: 0 },
}, { timestamps: true });

const AccountModel = mongoose.model<AccountDocument>('Account', accountSchema);

export { Account, AccountDocument, AccountModel };
