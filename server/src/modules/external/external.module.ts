import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';
import { Transactions, TransactionSchema } from 'src/schemas/transaction.schema';
import { AccountModule } from '../account/account.module';
import { Account, AccountSchema } from 'src/schemas/account.schema';


@Module({
  imports:[ 
    MongooseModule.forFeature([{ name: Transactions.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    forwardRef(() => AccountModule)
  ],
  controllers: [ExternalController],
  providers: [ExternalService],
  exports: [ExternalService],
})

export class TransactionModule {}