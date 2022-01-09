import { HttpException,HttpStatus ,BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AccountDto } from "./dto/account.Dto";
import { Account, AccountsDocument } from "src/schemas/account.schema";
import { TransactionService } from "../transaction/transaction.service";
import { Transactions } from "src/schemas/transaction.schema";
import { TransactionDto } from "../transaction/dto/transaction.dto";

import { forwardRef } from "@nestjs/common";

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) 
    private accountModel: Model<AccountsDocument>,
    @Inject(forwardRef(() => TransactionService))
    private TransactionService: TransactionService
  ) {}


  async findOneByAccountID({accountID}) : Promise<AccountsDocument> {
    try {

      return await this.accountModel.findOne({ accountID }).exec();
      
    } catch (e) {
      console.error(e)
      return {} as AccountsDocument
    }

  }

  async FindAccount(accountID : number ) :Promise<any>{
    return await this.accountModel.findOne( {accountID : accountID} ).exec();
  }

  async getBalance(accountID : number) {
        const acc = await this.findOneByAccountID({ accountID }) ; 
        const currBalance = acc.balance ;

        return currBalance ;

  }

  findAccounts(SID:number): Promise<Account[]> {
    return this.accountModel.find({ SID }).exec();
  }

;

  createAccount(SID:number):Promise<Account>{
    const accountID=Math.ceil(Math.random()*1000000000000);
    const createAccount= new this.accountModel({
      balance: 100,
      accountID,
      SID
    });
    const firstTransaction = this.TransactionService.createFirstTransaction();
  //  this.TransactionService.createTransaction({ ...firstTransaction, accountID: createAccount.accountID });
    return createAccount.save();

}
findOnebySID({ SID }): Promise<Account> {
  return this.accountModel.findOne({ SID: SID }).exec();
}

postAccountbyID(dto: AccountDto) {
 
  const firstAcc = new this.accountModel(dto);
  return firstAcc.save();

}

async updateRecieverBalance(accountID: number , amount:number): Promise<any> {
   const receiverAccount = await this.findOneByAccountID({ accountID });
   if (!receiverAccount)  
      throw new HttpException('Please check the sender account is correc', HttpStatus.BAD_REQUEST);
   const receiverBalance = receiverAccount.balance += amount;
   return receiverBalance;
   // await receiverAccount.save();
}

async updateSenderBalance(accountID: number , amount:number): Promise<any> {
  const senderAccount = await this.findOneByAccountID({ accountID });
  if (!senderAccount)  
    throw new HttpException('Please check the sender account is correc', HttpStatus.BAD_REQUEST);
  if (senderAccount.balance < amount) {
    throw new HttpException('Please check your balance', HttpStatus.BAD_REQUEST);
  }
  else {
  var senderBalance = senderAccount.balance -= amount;
  return senderBalance 
  // await senderAccount.save();
  }
}



}