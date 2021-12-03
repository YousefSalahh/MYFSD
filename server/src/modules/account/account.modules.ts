import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from "src/schemas/account.schema";
import { Account, AccountsDocument } from "src/schemas/account.schema";

@Module({
  imports:[MongooseModule.forFeature([{name : Account.name, schema: AccountSchema}])],
  exports: [AccountService],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
