import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

export type TransactionsDocument = Transactions & Document;

@Schema()
export class Transactions {
  
  @Prop({ required: true })
  transactionName: string;

  @Prop({type: Number , required:true})
  accountID: number;

  @Prop({  type: Date, required: true })
  dateOfToday: Date;

  @Prop({ required: true })
  debitAmount: number;

  @Prop({ required: true })
  creditAmount: number;

  @Prop({ required: false })
  from: string;
  
  @Prop({ required: false })
  to: string;

}

export const TransactionSchema = SchemaFactory.createForClass(Transactions)