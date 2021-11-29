import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  GIUemail: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  SID: number;

  @Prop({ required: true })
  dateofBirth: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  GIUusername: string;

  @Prop({ required: true })
  accoutID: number;

}

export const UserSchema = SchemaFactory.createForClass(User);