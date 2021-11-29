import {  IsNotEmpty } from "class-validator";

export class AccountDto {
  @IsNotEmpty()
  accountID: string;

  @IsNotEmpty()
  SID: string;
}
