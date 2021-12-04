import {  IsNotEmpty } from "class-validator";

export class AccountDto {
  /*@IsNotEmpty()
  accountID: string;
*/
  @IsNotEmpty()
  SID: number;

  @IsNotEmpty()
  balance: number;

  @IsNotEmpty()
  accountID: number;

}