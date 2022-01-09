import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

/**
 * http request consists of body and header
 * in the header authentication is sent through bearer authentication scheme
 * ex: bearer authentication : bearer + token (jwt) "shared token"
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: true,
      secretOrKey:"My_Secret_Key",
    });
  }
  /**
   * Determines if the user JWT token is valid.
   * On successfull validation, returns jwt payload 
   * @param payload
   */
  async validate(payload: any) {

    return {
       receiverAccNumber: payload.receiverAccNumber, amount: payload.amount , description:payload.description
      };
  }

}