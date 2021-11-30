import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import {TransactionsDocument, Transactions} from "src/schemas/transaction.schema";
import { TransactionDto } from './transaction.dto';

@Injectable()
export class TransactionService {
    constructor(
    private TransactionService: TransactionService,
    @InjectModel(Transactions.name) private transactionModel: Model<TransactionsDocument>
    ) {}


    findTransaction(accountID:number): Promise<Transactions[]> {
       return this.transactionModel.find({accountID:accountID}).exec();
    }






}