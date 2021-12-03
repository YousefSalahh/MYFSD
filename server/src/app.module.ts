import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AccountModule } from "./modules/account/account.modules";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    AccountModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    TransactionModule,
    UsersModule,
  ],
})
export class AppModule {}
