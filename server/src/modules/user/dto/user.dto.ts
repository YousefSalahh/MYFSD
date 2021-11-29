import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class registerDto {

    @IsNotEmpty()
    userName: string;
  
    @IsNotEmpty()
    GIUemail: string;
  
    @IsNotEmpty()
    SID: number;
  
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    name: string;
  
    @IsDate()
    dateofBirth: string;
  
    @Length(11)
    phone: string ; 
  
  }