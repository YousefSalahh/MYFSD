import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, PromiseProvider } from "mongoose";

export type AccountsDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  balance: number;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true })
  accountID: number;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
