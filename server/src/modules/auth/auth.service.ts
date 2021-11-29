import {  Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dtos/auth.dto"; 
import { UserService } from "../user/user.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument,User } from "src/schemas/user.schema";


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UserService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async validateUser(dto: AuthDto): Promise<User> {
    const user = await this.UserService.findOne({ GIUemail: dto.GIUemail });
    if (!user || user.password !== dto.password)
      throw new UnauthorizedException("Credentials incorrect");
    return user;
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return this.signUser(
      user.SID,
      user.GIUemail,
      user.name,
      user.password,
      user.phone,
      user.dateofBirth,    
    );
  }

  signUser(
    SID: number,
    GIUemail: string,
    name: string,
    password: string,
    phone: string,
    dateofBirth: string
  ) {
    const payload = {
      sub: SID,
      GIUemail: GIUemail,
      name:name,
      password: password,
      phone: phone,
      dateofBirth: dateofBirth,
    };
    return {
      acccess_token: this.jwtService.sign(payload),
  }
}

  
  findOne({ GIUemail }): Promise<User> {
    console.log(GIUemail);
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }

 /*   
  findOne2({ SID }): Promise<User> {
    console.log(SID);
    return this.userModel.findOne({ SID: SID }).exec();
  }

  

  logout() {
    return this.jwtService.sign( {
        exp :  new Date().getTime(), 
    }
    )*/
  }



  






