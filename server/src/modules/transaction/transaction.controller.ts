import { Controller } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { UseGuards, Get, Post, Param, Body } from "@nestjs/common";
import { TransactionDto } from "./dto/transaction.dto";

@Controller("transactions")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  // @UseGuards()
  @Get(":accountID")
  transaction(@Param("accountID") accountID: number): any { 
    if (!accountID) return console.log('no params provided')
    return this.transactionService.findTransaction(accountID);
  }

  // @UseGuards()
  @Post("/createTransaction")
  createTransaction(@Body() dto: TransactionDto): any {
    return this.transactionService.createTransaction(dto);
  }
}
