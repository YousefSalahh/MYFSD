import { Controller } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { UseGuards, Get, Post, Param, Body } from "@nestjs/common";
import { TransactionDto } from "./dto/transaction.dto";
<<<<<<< HEAD
import { InternalDto } from "./dto/internalDto";
import { AccountService } from "../account/account.service";
=======
import { InternalDto } from "./dto/internal.dto";

>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233
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
<<<<<<< HEAD
  @Post("/createTransaction")
  createTransaction(@Param("accountID") @Body() dto: TransactionDto): any {
    const transaction = this.transactionService.createTransaction(dto);
    return transaction;
=======
  @Post("/:accountID")
  createTransaction(@Body() dto: InternalDto): any {
    try {
      return this.transactionService.createInternaltransfer(dto);
    } catch (e) {
      console.error(e)
    }
>>>>>>> 633970195ad306cf6f423775bd0ebf4f70a2f233
  }

  // @Post('internalTransfers')
  // internalTransfer(@Body() sender_dto:InternalDto):any{
  //     const sender_transaction = this.transactionService.createTransaction(sender_dto);

  //     const reciever_transaction = this.transactionService.createRecieverTransaction(sender_dto);
  //     return [sender_transaction,reciever_transaction];
  // }




}
