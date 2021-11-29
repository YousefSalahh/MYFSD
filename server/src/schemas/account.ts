import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AccountsDocument = Account & Document;

@Schema()
export class Account {

  @Prop({ required: true })
  accountID: number;

  @Prop({ required: true })
  balance:number

  @Prop({ required: true })
  active: Boolean;


}

export const AccountSchema = SchemaFactory.createForClass(Account);