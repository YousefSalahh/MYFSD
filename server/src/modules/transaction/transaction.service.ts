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
<<<<<<< HEAD
import { InternalDto } from "./dto/internalDto";
import { TransactionDto } from "./dto/transaction.dto";
import { AccountDto } from "../account/dto/account.Dto";
=======
import { InternalDto } from "./dto/internal.dto";
import { TransactionDto } from "./dto/transaction.dto";
import { AccountDto } from "../account/dto/account.Dto";
import { forwardRef, Inject } from "@nestjs/common";


>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233
@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transactions.name)
<<<<<<< HEAD
    private transactionModel: Model<TransactionsDocument>,
    private accountModel: Model<AccountsDocument>,
=======
    private transactionModel: Model<Transactions>,
    @Inject(forwardRef(() => AccountService))
>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233
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
    debitAmount: number;
    transactionName: string;
    creditAmount: number;
    dateOfToday: Date;
  } {

    const dto = {
      debitAmount: 100,
      transactionName: "first $100",
      creditAmount: 0,
      dateOfToday: new Date(),
    };
    
    return dto;
    }

  //function update sender balance
  //function update reciever balance
  //createInternalTransaction hancall feha both if balance and account are valid


  //n store el accID currently opened
  //check if the balance of this acc id >= internal dto.balance
  //if == true ---> call 2 functions {updateRecieverAcc balance , updateSender account balance}
  //updateRecieverAcc balance , increase his balance && increase his debit
  //updateSender account balance , decrease his balance && increase his credit
<<<<<<< HEAD
  async createInternaltransfer(internaldto : InternalDto) :Promise<any> {   //we need to save sender accID
    const IsValidRecieverAccount = await this.AccountService.findOneByAccountID({ accountID: internaldto.recieverAccID });
    const senderAccID = 632 ;
    const amount = internaldto.amount;
    if( !IsValidRecieverAccount ) 
      throw new BadRequestException("enter a valid account to transfer successfully");
    
    if (await this.AccountService.getBalance(senderAccID) <=  internaldto.amount) {
        throw new BadRequestException("the amount you entered is more than your account balance");
       }

    else {  
      // const internalTransfer = new this.transactionModel(internaldto);
      // this.AccountService.calculateBalanceAccount(dto.accountID);
      const transaction = new this.transactionModel(internaldto);
      return transaction.save();
      //
    }
  }
    
    // updateSenderBalance(accountID:number) {
    //     var balance = await this.AccountService.getBalance(accountID);
    //     balance = balance - await this.createInternaltransfer()  ;
        
    //     return balance;    //update account table
    // }    



}



=======
  async createInternaltransfer({ fromAccount, toAccount, description, amount }: InternalDto) :Promise<any> {   //we need to save sender accID
    

      const updatedReceiverAccount = await this.AccountService.updateRecieverBalance(toAccount, amount);
      if (updatedReceiverAccount.error) return updatedReceiverAccount 
      const toTransaction = new this.transactionModel({
        accountID: toAccount,
        transactionName: description,
        dateOfToday: new Date(),
        debitAmount: amount,
        creditAmount: 0
      });
    
      const updatedSenderAccount = await this.AccountService.updateSenderBalance(fromAccount, amount);
      if (updatedSenderAccount.error) return updatedSenderAccount 
      const fromTransaction = new this.transactionModel({
        accountID: fromAccount,
        transactionName: description,
        dateOfToday: new Date(),
        debitAmount: 0,
        creditAmount: amount
      });

    
    
    // Update balance after transaction

    fromTransaction.save();
    updatedSenderAccount.save();
    
    toTransaction.save();
    updatedSenderAccount.save();


    }
  }
    
>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233



