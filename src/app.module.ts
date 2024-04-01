import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { transactionSchema } from './module/transactions/transaction/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './module/transactions/transaction/transaction.module';

@Module({
  imports: [
   ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal:true
   }),
   UserModule,
   TransactionModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
