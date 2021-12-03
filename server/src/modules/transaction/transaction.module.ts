import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transactions, TransactionSchema } from 'src/schemas/transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  imports:[ MongooseModule.forFeature([{ name:Transactions.name, schema:TransactionSchema }])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})

export class TransactionModule {}