import {  IsNotEmpty } from "class-validator";

export class TransactionDto
{
  @IsNotEmpty()
  transactionName:string;

  @IsNotEmpty()
  accountID: number;

  @IsNotEmpty()
  dateOfToday: Date;

  @IsNotEmpty()
  debitAmount: number;

  @IsNotEmpty()
  creditAmount: number;
}