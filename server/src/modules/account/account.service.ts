import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Account,AccountsDocument } from "src/schemas/account";
import { UserSchema } from "src/schemas/user.schema";
import { AccountDto } from "./dto/account.Dto";



@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountsDocument>
  ) {}

  
  

  findAccount(SID:number): Promise<Account[]> {
    return this.accountModel.find({SID:SID}).exec();
  }

  createAccount(dto:AccountDto):Promise<Account>{
      const createAccount= new this.accountModel({dto});
      return createAccount.save();

  }

  

}
