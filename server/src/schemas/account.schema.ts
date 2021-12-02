import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, PromiseProvider } from "mongoose";

export type AccountsDocument = Account & Document;

@Schema()
export class Account {

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  active: string;

  @Prop({ required: true })
  accountID: number;



}
  export const AccountSchema = SchemaFactory.createForClass(Account);
