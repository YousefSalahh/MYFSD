import {  Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dtos/auth.dto"; 
import { UserService } from "../user/user.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument,User } from "src/schemas/user.schema";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,

    private UserService: UserService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,

    ) {}


  async login(dto: AuthDto) {
    
   const payload={
     GIUemail:dto.GIUemail,
     password:dto.password
   }

   let credentials = this.jwtStrategy.validate(payload)
   return this.jwtService.sign(credentials,{secret:process.env.JWT_SECRET});
  }
  
/*
  signUser(
    SID: number,
    GIUemail: string,
    name: string,
    password: string,
    phone: string,
    dateofBirth: string
  ){
    const payload={
    sub: SID,
    GIUemail: GIUemail,
    name: name,
    password: password,
    phone: phone,
    dateofBirth: dateofBirth
    }

    return {
      acccess_token:this.jwtService.sign(payload,{secret:process.env.JWT_SECRET}),
    }
  }
*/
   
  findOne({ GIUemail }): Promise<User> {
    console.log(GIUemail);
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }
/*

  async validateUser(dto: AuthDto): Promise<User> {
    const user = await this.UserService.findOne({ GIUemail: dto.GIUemail });
    if (!user || user.password !== dto.password)
      throw new UnauthorizedException("Credentials incorrect");
    return user;
  }
*/
}
