import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UserService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async validateUser(dto: AuthDto): Promise<User> {
    const user = await this.UserService.findOne({ GIUemail: dto.email });
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
    return this.jwtService.sign(payload);
  }

  
  findOne({ GIUemail }): Promise<User> {
    console.log(GIUemail);
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }

  logout() {
    return this.jwtService.sign( {
        exp :  new Date().getTime(), 
    }
    )
  }

}
