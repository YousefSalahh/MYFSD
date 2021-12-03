import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
//import { Account,AccountsDocument } from "src/schemas/account";
import { UserSchema } from "src/schemas/user.schema";
import { AccountDto } from "./dto/account.Dto";
import { Account, AccountsDocument } from "src/schemas/account.schema";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
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
findOnebySID({ SID }): Promise<Account> {
  console.log(SID);
  return this.accountModel.findOne({ SID: SID }).exec();
}
postAccountbyID(SID: number, dto: AccountDto) {
  const postAccbySID = this.findOnebySID({SID: dto.SID});
  if (!postAccbySID) {
    throw new HttpException('not cannot be posted', HttpStatus.NOT_FOUND);
  }
  else {
    const firstAcc = new this.accountModel(dto);
    return firstAcc.save();

  }
}



}