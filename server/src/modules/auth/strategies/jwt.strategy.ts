import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService : UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: true,
      secretOrKey: process.env.JWT_SECRET,
      userService: UserService
    });
  }
  /**
   * Determines if the user JWT token is valid.
   * On successfull validation, returns jwt payload (assigned to req.user)
   * @param payload
   */
  async validate(payload: any) {
    const user = await this.userService.findOne({ GIUemail: payload.email });
    if (!user || user.password !== payload.password)
      throw new UnauthorizedException("Credentials incorrect");
    else
    {
      payload={
        SID: payload.sub,
        password:payload.password,
        GIUemail:payload.GIUemail
      }
    }

    return payload;
  }
}
