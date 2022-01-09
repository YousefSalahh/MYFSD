import {  IsNotEmpty } from "class-validator";

export class TransactionDto
{
  @IsNotEmpty()
  transactionName:string;   

  @IsNotEmpty()
  description :string;   
  
  @IsNotEmpty()
  accountID: number;  

  @IsNotEmpty()
  dateOfToday: Date;

  @IsNotEmpty()
  debitAmount: number;

  @IsNotEmpty()
  creditAmount: number;

  @IsNotEmpty()
  amount: number;
 
  
}