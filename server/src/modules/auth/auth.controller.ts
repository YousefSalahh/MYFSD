import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { AuthDto, registerDto } from "./dtos/auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService ) {}

  /**
   * API endpoint handler for user login
   * @param dto
   */


  @Post("/login")
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post("/register")
  register(@Body() dto: registerDto){
    return this.authService.register(dto);
  }


}