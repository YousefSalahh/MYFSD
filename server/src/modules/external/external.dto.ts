import { IsNotEmpty } from 'class-validator';

export class externalDto{

  @IsNotEmpty()
  receiverAccNumber:number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

}