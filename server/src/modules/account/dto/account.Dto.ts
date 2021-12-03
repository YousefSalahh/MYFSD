import {  IsNotEmpty } from "class-validator";

export class AccountDto {
  /*@IsNotEmpty()
  accountID: string;
*/
  @IsNotEmpty()
  SID: string;

  @IsNotEmpty()
  balance: number;

  @IsNotEmpty()
  accountID: number;

}