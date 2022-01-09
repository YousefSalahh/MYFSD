import {  IsNotEmpty } from "class-validator";

export class InternalDto
{
  // @()
  // senderAccID: number;

  @IsNotEmpty()
  recieverAccID: number;

  @IsNotEmpty() 
  amount: number;


  // @IsNotEmpty()
  // creditAmount: number;
}