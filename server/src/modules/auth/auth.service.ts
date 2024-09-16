import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dtos/auth.dto";
import { UserService } from "../user/user.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, User } from "src/schemas/user.schema";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { forwardRef, Inject } from "@nestjs/common";


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private UserService: UserService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}
  /**
   * Determines if the user credentials provided are correct
   * @param dto
   */

  async validateUser(GIUemail: string, pass: string): Promise<any> {
    const user = await this.UserService.findOne({ GIUemail });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: AuthDto) {
    const user = await this.UserService.findOne(dto);  
    const payload = { GIUemail: dto.GIUemail };
    return {
      GIUemail: user.GIUemail,
      SID: user.SID ,
      access_token: this.jwtService.sign(payload),
    };
  }


  findOne({ GIUemail }): Promise<User> {
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }
}
