import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transactions, TransactionSchema } from 'src/schemas/transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../account/account.service';

@Module({
  imports:[ 
    MongooseModule.forFeature([{ name: Transactions.name, schema:TransactionSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, AccountService],
  exports: [TransactionService],
})

export class TransactionModule {}