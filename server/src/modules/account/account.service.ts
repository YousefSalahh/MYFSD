import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
//import { Account,AccountsDocument } from "src/schemas/account";
import { UserSchema } from "src/schemas/user.schema";
import { AccountDto } from "./dto/account.Dto";
import { Account, AccountsDocument } from "src/schemas/account.schema";


@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountsDocument>
  ) {}

  
  

  findAccounts(SID:number): Promise<Account[]> {
    return this.accountModel.find({SID:SID}).exec();
  }

;
/*
createFirstAccount(dto:AccountDto){
  const newAccount= new this.accountModel(dto);
  return newAccount.save()

};

  createAccount(SID:number):Promise<Account>{
      const accountID=Math.random();
      const createAccount= new this.accountModel({
        balance:100,
        active:"active",
        accountID:accountID
      });
      return createAccount.save();

  }
*/
  createAccount(SID:number):Promise<Account>{
    const accountID=Math.random();
    const createAccount= new this.accountModel({
      active:"active",
      accountID:accountID,
      SID:SID
    });
    return createAccount.save();

}

}