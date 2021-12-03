import { Controller, Param } from "@nestjs/common";
import { AccountService } from "./account.service";
import { Post, Body,Get } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AccountDto } from "./dto/account.Dto";

@Controller("account")
export class AccountController {
  constructor(private accountService: AccountService) {}


  //@UseGuards()
  @Get('/:SID')
  viewDashboard(@Param('SID')SID: number): any {
    return this.accountService.findAccounts(SID);
  }
/*
  @Post('/createAccount')
  createFirstAccount(@Body() dto:AccountDto ) {
      return this.accountService.createFirstAccount(dto);
  } */
/*
  @Post(":SID")
  CreateAccount(@Param("SID") SID: number): any {
    return this.accountService.createAccount(SID);  
  } */

  //@UseGuards()
  /*
  @Post('/:SID')
      createAccount(@Body(/*'SID')SID:number):any{
      return this.accountService.createAccount(SID);
  } 
  */
 /*
  @Post("/:SID")
  CreateAccount(@Param("SID") SID: number): any {
    return this.accountService.createAccount(SID);  
  }
/*
  async postAccountbyID(@Body() dto: AccountDto, @Param('SID') SID: number) {
    return this.accountService.postAccountbyID(Number(SID), dto);
  }
*/
  
  @Post('/:SID')  
  postAccountbyID(@Body() dto: AccountDto , @Param('SID') SID : number) : any {
    return this.accountService.postAccountbyID(Number(SID), dto)
  }

}