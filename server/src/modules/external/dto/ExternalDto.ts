import { IsNotEmpty } from 'class-validator';

export class ExternalDto{

  @IsNotEmpty()
  url:string;

  @IsNotEmpty()
  receiverAccNumber:number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

}