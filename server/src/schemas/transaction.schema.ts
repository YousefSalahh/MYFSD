
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document } from "mongoose";

export type TransactionsDocument = Transactions & Document;

@Schema()
export class Transactions {
  @Prop({ required: true })
  transactionName: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: Number, required: true })
  accountID: number;

  @Prop({ type: Date, required: true })
  dateOfToday: Date;

  @Prop({ required: true })
  debitAmount: number;

  @Prop({ required: true })
  creditAmount: number;

<<<<<<< HEAD
  @Prop({ required: false })  //accountID loggedIn
  from: number;   

  @Prop({ required: false })  //account ID of reciever
  to: number;

  @Prop({ required: false })  //for esxternal transfers
  bankName: string;
=======
  @Prop({ required: false })
  from: number;

  @Prop({ required: false })
  to: number;
>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233
}

export const TransactionSchema = SchemaFactory.createForClass(Transactions);
