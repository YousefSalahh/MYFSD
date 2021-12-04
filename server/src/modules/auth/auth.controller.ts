import { Body, Controller, Post, Request } from "@nestjs/common";
import { AuthDto } from "./dtos/auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * API endpoint handler for user login
   * @param dto
   */

  @Post("/login")
  async login(
    @Body('GIUemail') GIUemail: AuthDto['GIUemail'],
    @Body('password') password: AuthDto['password']
  ) {
    return this.authService.login({ GIUemail, password });
  }
}
