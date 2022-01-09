import { Controller } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { UseGuards, Get, Post, Param, Body } from "@nestjs/common";
import { TransactionDto } from "./dto/transaction.dto";
import { InternalDto } from "./dto/internal.dto";

@Controller("transactions")
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  // @UseGuards()
  @Get("/:accountID")
  transaction(@Param("accountID") accountID: number): any { 
    if (!accountID) return console.log('no params provided')
    return this.transactionService.findTransaction(accountID);
  }

  // @UseGuards()
  @Post("/:accountID")
  createTransaction(@Body() dto: InternalDto): any {
    try {
      return this.transactionService.createInternaltransfer(dto);
    } catch (e) {
      console.error(e)
    }
  }

  // @Post('internalTransfers')
  // internalTransfer(@Body() sender_dto:InternalDto):any{
  //     const sender_transaction = this.transactionService.createTransaction(sender_dto);

  //     const reciever_transaction = this.transactionService.createRecieverTransaction(sender_dto);
  //     return [sender_transaction,reciever_transaction];
  // }




}
