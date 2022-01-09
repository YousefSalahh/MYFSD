import { forwardRef, Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema, Account, AccountsDocument } from "src/schemas/account.schema";
import { TransactionService } from "../transaction/transaction.service";
import { Transactions, TransactionSchema } from "src/schemas/transaction.schema";
import { TransactionModule } from "../transaction/transaction.module";


@Module({
  imports:[
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: Transactions.name, schema: TransactionSchema }]),
    forwardRef(() => TransactionModule)
  ],
  controllers: [ AccountController ],
  providers: [ AccountService, TransactionService ],
  exports: [ AccountService ],
})
export class AccountModule {}
