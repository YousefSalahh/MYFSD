export class Transaction {
    constructor(
      public transactionID:string,
      public date: Date,
      public debitAmnt: number,
      public creditAmnt: number,
      public totAmnt: number,
      


    ) {}
  }