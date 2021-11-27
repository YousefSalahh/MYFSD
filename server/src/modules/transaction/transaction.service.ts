import { Injectable,NotFoundException } from '@nestjs/common';
import { Transaction } from './transaction.model';
  import { InjectModel } from '@nestjs/mongoose';
import { Transactions, TransactionsDocument } from 'src/schemas/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transactions.name) private transactionModel: Model<TransactionsDocument>) {}
  private transactions: Transaction[] = [];

  // findOne({accountID}):Promise<Transactions>
  // {
  //   return this.transactionModel.findAll({accountID: number}).exec();
  // }

  insertTransaction(transactionID:string,date:Date, debitAmnt: number, creditAmnt: number,totalAmnt: number) {
    const newTransaction = new Transaction(transactionID,date, debitAmnt, creditAmnt,totalAmnt);
    this.transactions.push(newTransaction);
    
    
  
  }

  getTransaction(accountID : string) {
    return this.transactionModel.findById(accountID).exec();
  }

  // getSingleTransaction(transId: number) {
  //   const transaction = this.findTransaction(transId)[0];
  //   return { ...transaction };
  // }

  // private findTransaction(id: number): [Transaction, number] {
  //   const transactionIndex = this.transactions.findIndex(trans => trans.id === id);
  //   const transaction = this.transactions[transactionIndex];
  //   if (!transaction) {
  //     throw new NotFoundException('Could not find transaction.');
  //   }
  //   return [transaction, transactionIndex];
  }