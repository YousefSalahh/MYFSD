import { Controller, Get, Request, UseGuards,Post,Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { registerDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  /**
   * API endpoint handler returns the authenticated user from JWT payload
   */    
  @UseGuards(AuthGuard('jwt'))
  @Get()
  user(@Request() req: any): any {
    return req.user;
  }

  /**
   * API endpoint handler returns all users from mongo database
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  users(): any {
    return this.userService.findAll();
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post("/register")
  register(@Body() dto: registerDto){
    return this.userService.register(dto);
  }

}
