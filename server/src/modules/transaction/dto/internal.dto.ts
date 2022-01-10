import {  IsNotEmpty } from "class-validator";

export class InternalDto
{
  @IsNotEmpty()
  fromAccount: number;

  @IsNotEmpty()
  toAccount: number;

  @IsNotEmpty()
  transactionName: string;

  @IsNotEmpty() 
  amount: number;

  @IsNotEmpty()
  description: string;

}