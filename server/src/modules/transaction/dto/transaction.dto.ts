import {  IsNotEmpty } from "class-validator";

export class TransactionDto
{
  credit: number;
  debit: number;
  
  @IsNotEmpty()
  accountID: number;

  @IsNotEmpty()
  date: number;




}

