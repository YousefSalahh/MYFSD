import { IsNotEmpty } from 'class-validator';

export class externalDto{

  @IsNotEmpty()
  receiverAccountNumber:number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

}