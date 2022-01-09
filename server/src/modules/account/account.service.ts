import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
// import { UserSchema } from "src/schemas/user.schema";
import { AccountDto } from "./dto/account.Dto";
import { Account, AccountsDocument } from "src/schemas/account.schema";
import { TransactionService } from "../transaction/transaction.service";
// import { HttpException } from "@nestjs/common";
// import { HttpStatus } from "@nestjs/common";
<<<<<<< HEAD
import { InternalDto } from "../transaction/dto/internalDto";
import { Transactions } from "src/schemas/transaction.schema";
import { TransactionDto } from "../transaction/dto/transaction.dto";
=======
// import { InternalDto } from "../transaction/dto/internalDto";
import { Transactions } from "src/schemas/transaction.schema";
import { TransactionDto } from "../transaction/dto/transaction.dto";

import { forwardRef } from "@nestjs/common";

>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) 
    private accountModel: Model<AccountsDocument>,
<<<<<<< HEAD
    private TransactionService: TransactionService
  ) {}

  
  async findOneByAccountID({accountID}) : Promise<Account> {
    console.log(accountID);
    return await this.accountModel.findOne({ accountID: accountID }).exec();
}

  async getBalance(accountID : number) {
        const acc = await this.findOneByAccountID({accountID}) ; 
        const currBalance = acc.balance ;

        return currBalance ;

  }
=======
    @Inject(forwardRef(() => TransactionService))
    private TransactionService: TransactionService
  ) {}

>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233

  async findOneByAccountID({accountID}) : Promise<AccountsDocument> {
    try {

      return await this.accountModel.findOne({ accountID }).exec();
      
    } catch (e) {
      console.error(e)
      return {} as AccountsDocument
    }

  }

<<<<<<< HEAD
;

=======
  async getBalance(accountID : number) {
        const acc = await this.findOneByAccountID({ accountID }) ; 
        const currBalance = acc.balance ;

        return currBalance ;

  }

  findAccounts(SID:number): Promise<Account[]> {
    return this.accountModel.find({ SID }).exec();
  }

;

>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233
  createAccount(SID:number):Promise<Account>{
    const accountID=Math.ceil(Math.random()*1000000000000);
    const createAccount= new this.accountModel({
      balance: 100,
      accountID,
      SID
    });
    const firstTransaction = this.TransactionService.createFirstTransaction();
    this.TransactionService.createTransaction({ ...firstTransaction, accountID: createAccount.accountID });
    return createAccount.save();

}
findOnebySID({ SID }): Promise<Account> {
  return this.accountModel.findOne({ SID: SID }).exec();
}

postAccountbyID(dto: AccountDto) {
  // const postAccbySID = this.findOnebySID({SID: dto.SID});
  // if (!postAccbySID) {
  //   throw new HttpException('not cannot be posted', HttpStatus.NOT_FOUND);
  // }
  // else {
  const firstAcc = new this.accountModel(dto);
  return firstAcc.save();

  // }
}
//function to get Balance by accountID
//increment the internal dto amount by the old amount
//push in the db
<<<<<<< HEAD
=======

//we need to access the balance by accountID and over write it with a new const value

async updateRecieverBalance(accountID: number , amount:number): Promise<any> {
   const receiverAccount = await this.findOneByAccountID({ accountID });
   if (!receiverAccount) return { error: "Please check the receiver account is correct" };

  const receiverBalance = receiverAccount.balance += amount;
   return receiverBalance;
   // await receiverAccount.save();
}

async updateSenderBalance(accountID: number , amount:number): Promise<any> {
  const senderAccount = await this.findOneByAccountID({ accountID });
  if (!senderAccount)  return { error: "Please check the sender account is correct" };

  if (senderAccount.balance < amount) {
    return  { error: "insuffecient funds" };
  }
  
  var senderBalance = senderAccount.balance -= amount;
  return senderBalance 
  // await senderAccount.save();

}
>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233

//we need to access the balance by accountID and over write it with a new const value
/*
async updateRecieverBalance(internalDto : InternalDto , dto : TransactionDto): Promise<any> {
  const increaseBalanceBy = internalDto.balance;
   await this.TransactionService.findTransaction(accountID);
}

async updateSenderBalance(InternalDto:InternalDto , dto : TransactionDto): Promise<any> {
  const increaseBalanceBy = InternalDto.balance;
   await this.TransactionService.findTransaction(accountID);
}

*/


}