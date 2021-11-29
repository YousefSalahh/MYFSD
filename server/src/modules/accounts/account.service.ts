import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Accounts,AccountsDocument} from "src/schemas/account";
import { UserSchema } from "src/schemas/user.schema";
import { AccountDto } from "./dto/account.Dto";



@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Accounts.name) private accountModel: Model<AccountsDocument>
  ) {}

  
  

  findAccount(SID:number): Promise<Accounts[]> {
    return this.accountModel.find({SID:SID}).exec();
  }
}