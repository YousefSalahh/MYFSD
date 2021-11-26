import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, PromiseProvider } from "mongoose";

export type AccountsDocument = Accounts & Document;

@Schema()
export class Accounts {
  @Prop({ required: true })
  debitAmont: number;

  @Prop({ required: true })
  creditAmount: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  ID: string;

  @Prop({ required: true })
  dateOfToday: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Accounts);