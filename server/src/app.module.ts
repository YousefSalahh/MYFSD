import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AccountModule } from "./modules/account/account.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { ConfigModule } from "@nestjs/config";

require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot(),
    UsersModule,
    TransactionModule,
    AccountModule,
    AuthModule,
  ],
})
export class AppModule {}
