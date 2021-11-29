import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transactions, TransactionSchema } from 'src/schemas/transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transactions.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:Transactions.name,schema:TransactionSchema}])],
  exports: [TransactionService],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}