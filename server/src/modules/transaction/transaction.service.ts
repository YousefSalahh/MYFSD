import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  TransactionsDocument,
  Transactions,
} from "src/schemas/transaction.schema";
import { TransactionDto } from "./dto/transaction.dto";

@Injectable()
export class TransactionService {
  constructor(
    //  private TransactionService: TransactionService,
    @InjectModel(Transactions.name)
    private transactionModel: Model<TransactionsDocument>
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
}
