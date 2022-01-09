import {  IsNotEmpty } from "class-validator";

export class InternalDto
{
  @IsNotEmpty()
  fromAccount: number;

  @IsNotEmpty()
  toAccount: number;

  @IsNotEmpty() 
  amount: number;

  @IsNotEmpty()
  description: string;

}