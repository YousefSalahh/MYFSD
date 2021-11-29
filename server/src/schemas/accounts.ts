import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, PromiseProvider } from "mongoose";

export type AccountsDocument = Accounts & Document;

@Schema()
export class Accounts {
  @Prop({ required: true })
  balance: number;
  
  @Prop({ required: true })
  active: string;
  


}
  export const AccountSchema = SchemaFactory.createForClass(Accounts);