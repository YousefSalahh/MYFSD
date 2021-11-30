import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

export type TransactionsDocument = Transactions & Document;

@Schema()
export class Transactions {
  @Prop({ required: true })
  transactionID: number;

  @Prop({required:true})
  accountID:number;

  @Prop({  type: Date, required: true })
  dateOfToday: Date;

  @Prop({ required: true })
  debitAmount: number;

  @Prop({ required: true })
  creditAmount: number;

  


}

export const TransactionSchema = SchemaFactory.createForClass(Transactions)