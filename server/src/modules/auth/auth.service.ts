import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto,registerDto} from "./dtos/auth.dto"; 
import { UserService } from "../user/user.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument,User } from "src/schemas/user.schema";
import { JwtStrategy } from "./strategies/jwt.strategy";

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
      acccess_token:this.jwtService.sign(payload, {secret: process.env.JWT_SECRET}),
  }
}

  
  findOne({ GIUemail }): Promise<User> {
    console.log(GIUemail);
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }

  async register(dto : registerDto) {
    const user = await this.UserService.findOne({ GIUemail: dto.GIUemail });
    const userSID = await this.UserService.findOne2({ SID: dto.SID });

    if(user || userSID) 
      throw new BadRequestException("Email or SID Exists, try another");
      
    else {
      const newUser = await this.userModel.create(dto);
      this.signUser(newUser.SID , newUser.GIUemail , newUser.name , newUser.password , newUser.phone , newUser.dateofBirth) 
    }

    }




  






}
