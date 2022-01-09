import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, PromiseProvider } from "mongoose";

export type AccountsDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  balance: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true })
  accountID: number;

  @Prop({ required: false })
  debitAmount: number;

  @Prop({ required: false })
  creditAmount: number;

  @Prop({ required: true })
  SID: number;

}
export const AccountSchema = SchemaFactory.createForClass(Account);
