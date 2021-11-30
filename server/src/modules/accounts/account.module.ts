import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from 'src/schemas/account';
import { Account, AccountsDocument } from "src/schemas/account";

@Module({
  imports:[MongooseModule.forFeature([{name : Account.name, schema: AccountSchema}])],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}