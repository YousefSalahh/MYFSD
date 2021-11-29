import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class registerDto {

    @IsNotEmpty()
    userName: string;
  
    @IsEmail()
    email: string;
  
    @Length(4)
    SID: number;
  
    @Length(6, 20)
    password: string;
    
    @IsNotEmpty()
    name: string;
  
    @IsDate()
    dateofBirth: string;
  
    @Length(11)
    phone: string ; 
  
  }