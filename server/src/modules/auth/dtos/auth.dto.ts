import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail()
  GIUemail: string;

  @IsNotEmpty()
  password: string;

  // @IsNotEmpty()
  // SID: number;
  
}
