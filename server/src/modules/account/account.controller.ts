import { Controller, Param } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Post, Body,Get } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AccountDto } from "./dto/account.Dto";

@Controller("account")
export class AccountController {
  constructor(private accountService: AccountService) {}


  //@UseGuards()
  @Get(':SID')
  viewDashboard(@Param('SID')SID: number): any {
    return this.accountService.findAccounts(SID);
  }
  
  @Post('/:SID')  
  postAccountbyID(@Body() dto: AccountDto) : any {
    return this.accountService.postAccountbyID(dto)
  }

}