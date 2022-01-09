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

  createExternalTransaction(dto: TransactionDto): Promise<Transactions> {
    const transaction = new this.transactionModel(dto);
    return transaction.save();
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
  } {

    const dto = {
      amount: 100,
      transactionName: "first $100",
      type: "debit",
      dateOfToday: new Date(),
    };
    
    return dto;
    }

  async createInternaltransfer({ fromAccount, toAccount, description, amount }: InternalDto) :Promise<any> {   //we need to save sender accID
    

      const updatedReceiverAccount = await this.AccountService.updateRecieverBalance(toAccount, amount);
      if (updatedReceiverAccount.error) return updatedReceiverAccount 
      const toTransaction = new this.transactionModel({
        accountID: toAccount,
        transactionName: description,
        dateOfToday: new Date(),
        type:"debit",
         amount: amount,
        // creditAmount: 0
      });
    
      const updatedSenderAccount = await this.AccountService.updateSenderBalance(fromAccount, amount);
      if (updatedSenderAccount.error) return updatedSenderAccount 
      const fromTransaction = new this.transactionModel({
        accountID: fromAccount,
        transactionName: description,
        dateOfToday: new Date(),
        type:"credit",
        // debitAmount: 0,
         amount: amount
      });

    
    
    // Update balance after transaction

    fromTransaction.save();
    updatedSenderAccount.save();
    
    toTransaction.save();
    updatedSenderAccount.save();


    }
  }
    



