import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

