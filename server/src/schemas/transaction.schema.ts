import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

export type TransactionsDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  transactionID: number;

  @Prop({required:true})
  accountID:number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateOfToday: Date;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)