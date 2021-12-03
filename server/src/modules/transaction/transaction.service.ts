import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import {TransactionsDocument, Transactions} from "src/schemas/transaction.schema";
import { TransactionDto } from './dto/transaction.dto';


@Injectable()
export class TransactionService {
    constructor(
   //  private TransactionService: TransactionService,
    @InjectModel(Transactions.name) private transactionModel: Model<TransactionsDocument>
    ) {}


    findTransaction(accountID:number): Promise<Transactions[]> {
       return this.transactionModel.find({accountID:accountID}).exec();
    }


    createTransaction(dto:TransactionDto):Promise<Transactions>{
       console.log(dto)
       const transaction = new this.transactionModel(dto);
       return transaction.save();
    }

    createFirstTransaction(): {
      debitAmount: number;
      transactionName: string;
      creditAmount: number;
      date: Date;
    } {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '1'); //January is 0!
      var yyyy = today.getFullYear();
      

       const dto = {
          debitAmount:100,
          transactionName: "first $100",
          creditAmount:0,
          date:today
       }
      return dto;
    }

}