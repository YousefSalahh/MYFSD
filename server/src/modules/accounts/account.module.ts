import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from 'src/schemas/account';
import { Accounts, AccountsDocument } from "src/schemas/account";

@Module({
  imports:[MongooseModule.forFeature([{name : Accounts.name, schema: AccountSchema}])],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}