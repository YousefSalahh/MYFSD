import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, PromiseProvider } from "mongoose";

export type AccountsDocument = Accounts & Document;

@Schema()
export class Accounts {

  @Prop({ required: true })
  balance: number;
  
  @Prop({ required: true })
  active: string;
  


<<<<<<< HEAD:server/src/schemas/account.ts
  @Prop({ required: true })
  dateOfToday: Date;

  

=======
>>>>>>> 41f188dd2c9578d49a7045a745621800c1b43504:server/src/schemas/accounts.ts
}
  export const AccountSchema = SchemaFactory.createForClass(Accounts);