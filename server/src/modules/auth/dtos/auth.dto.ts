import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
  @IsEmail()
  GIUemail: string;

  @IsNotEmpty()
  password: string;
}

