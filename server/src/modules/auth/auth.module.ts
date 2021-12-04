import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserService } from "../user/user.service";
import { AccountService } from "../account/account.service";
import { Account, AccountSchema } from "src/schemas/account.schema";
import { Transactions, TransactionSchema } from "src/schemas/transaction.schema";
import { TransactionService } from "../transaction/transaction.service";

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: "5m" },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    MongooseModule.forFeature([{ name: Transactions.name, schema: TransactionSchema }]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, AccountService, TransactionService ],
  exports: [ AuthService ],
})
export class AuthModule {}
