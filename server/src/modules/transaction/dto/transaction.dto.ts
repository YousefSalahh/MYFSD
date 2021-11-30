import {  IsNotEmpty } from "class-validator";

export class TransactionDto
{
  @IsNotEmpty()
  accountID: number;

  @IsNotEmpty()
  SID: number;
}

