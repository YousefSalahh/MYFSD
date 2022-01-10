import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { externalDto } from '../dto/external.dto';
import { JwtService } from '@nestjs/jwt';
/**
 * http request consists of body and header
 * in the header authentication is sent through bearer authentication scheme
 * ex: bearer authentication : bearer + token (jwt) "shared token"
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( private JwtService:JwtService ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: true,
      secretOrKey:"My_Secret_Key",
    });
  }
  
  async validate(payload: any) {

    return {
       receiverAccNumber: payload.receiverAccNumber, amount: payload.amount , description:payload.description
      };
  }
  GenerateToken(dto:externalDto,res:any)
  {
    //create token
    const token = this.JwtService.sign(
        {
            receiverAccNumber:dto.receiverAccNumber,  //store in the token the details of the transaction
             amount:dto.amount ,   
             description:dto.description }, 
            {
              secret:"My-Secret-Key", //send secret and expiray date also in the token
              expiresIn: "5min",
        });
    
    let response: object = { ...{receiverAccNumber:dto.receiverAccNumber, amount:dto.amount ,description:dto.description }, token: token };
    res.json(response);
    
    return res;
  }

}