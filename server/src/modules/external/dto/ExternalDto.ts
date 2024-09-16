import { IsNotEmpty } from 'class-validator';

export class ExternalDto{

  @IsNotEmpty()
  url:string;

  @IsNotEmpty()
  receiverAccountNumber:number;

  @IsNotEmpty()
  accountID: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

}