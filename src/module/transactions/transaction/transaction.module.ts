import { User, UserModel, userSchema } from './../../user/user.schema';
import { UserModule } from './../../user/user.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConnection } from 'src/db';
import { transactionSchema } from './transaction.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: transactionSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
    ]),
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection,
    }),
   UserModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService,DatabaseConnection],
})
export class TransactionModule {}
