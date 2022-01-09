import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@sp/schemas';
import { TransactionModule } from '../transaction/transaction.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../account/account.service';
import { Account, AccountSchema } from "src/schemas/account.schema";
import { TransactionService } from '../transaction/transaction.service';
import { forwardRef } from "@nestjs/common";
import { Transactions, TransactionSchema } from 'src/schemas/transaction.schema';


@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: Transactions.name, schema: TransactionSchema }]),
    forwardRef(() => TransactionModule), 
    forwardRef(() => AccountModule)
  ],
  exports: [ UserService ],
  controllers: [ UserController ],
  providers: [ UserService, AccountService, TransactionService ],
  // providers: [ UserService ],
})
export class UsersModule {}