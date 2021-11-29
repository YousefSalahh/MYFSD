import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
  @IsEmail()
  GIUemail: string;

  @IsNotEmpty()
  password: string;
}


export class registerDto {
  @IsNotEmpty()
  GIUemail: string;

  @IsNotEmpty()
  SID: number;

  @IsNotEmpty()
  password: string;
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dateofBirth: string;

  @Length(11)
  phone: string ; 

}