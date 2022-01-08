import {  IsNotEmpty } from "class-validator";

export class InternalDto
{
  @IsNotEmpty()
  accountID: number;

  @IsNotEmpty() 
  balance: number;
  
}