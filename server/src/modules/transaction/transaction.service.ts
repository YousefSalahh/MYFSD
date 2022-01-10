import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountsDocument } from "src/schemas/account.schema";
import {
  TransactionsDocument,
  Transactions,
} from "src/schemas/transaction.schema";
import { Account } from "src/schemas/account.schema";
import { AccountService } from "../account/account.service";
import { InternalDto } from "./dto/internal.dto";
import { TransactionDto } from "./dto/transaction.dto";
import { AccountDto } from "../account/dto/account.Dto";
import { forwardRef, Inject } from "@nestjs/common";

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transactions.name)
    private transactionModel: Model<Transactions>,
    @Inject(forwardRef(() => AccountService))
    private AccountService: AccountService
  ) {}

  findTransaction(accountID: number): Promise<Transactions[]> {
    console.log(accountID, typeof accountID);

    return this.transactionModel.find({ accountID: accountID }).exec();
  }

  createTransaction(dto: TransactionDto): Promise<Transactions> {
    const transaction = new this.transactionModel(dto);
    return transaction.save();
  }


  createFirstTransaction(): {
    amount: number;
    transactionName: string;
    type:string;
    dateOfToday: Date;
    description: string;
  } {

    const dto = {
      amount: 100,
      transactionName: "first $100",
      type: "debit",
      dateOfToday: new Date(),
      description: "first $100",
    };
    
    return dto;
    }

    async createInternaltransfer(dto: InternalDto) :Promise<any> {   //we need to save sender accID
      const isValid = await this.AccountService.FindAccount(dto.toAccount);
      if(isValid){
      const createDtoFrom :TransactionDto = {
        accountID : dto.toAccount,
        transactionName: "Internal",
        description : "Internal Transfer",
        dateOfToday: new Date(),
        type:"debit",
         amount: dto.amount,
      };
      await this.createTransaction(createDtoFrom);

      const createDtoTo :TransactionDto = {
        accountID : dto.fromAccount,
        transactionName: "Internal",
        description : "Internal Transfer",
        dateOfToday: new Date(),
        type:"credit",
         amount: dto.amount,
      };

      await this.createTransaction(createDtoTo);

      this.AccountService.updateSenderBalance(dto.fromAccount,dto.amount);
      this.AccountService.updateRecieverBalance(dto.toAccount,dto.amount)

    }  
  }
}



