import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dtos/auth.dto";
import { UserService } from "../user/user.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, User } from "src/schemas/user.schema";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
    const payload = { GIUemail: dto.GIUemail };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /*
  login(dto: AuthDto) {
    /* 
      TODO: Add your login logic here to return
      appropriate exceptions when a user/password
      is incorrect. In addition, if a user is found
      and credentials are correct, create a JWT token
      with the entire user object as the payload.
      
      Note: JWT open standard RFC 7519 recommends
      a payload object contain certain "claims".
      As such, it's recommended to create a property
      called "sub" in payload which maps to the user id.
  }
    */

  findOne({ GIUemail }): Promise<User> {
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }
}
