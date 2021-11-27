import { Controller,
  Post,
  Body,
  Get,
  Param,
  } from '@nestjs/common';
import { TransactionService } from './transaction.service';


@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('trasnaction')
  addTransaction(
    @Body('date ') transDate: Date,
    @Body('transactionid') transID: string,
    @Body('debitAmnt') debitAmount: number,
    @Body('creditAmnt') creditAmount: number,
    @Body('totalAmnt') totAmount: number,


  ) {
    const generatedId = this.transactionService.insertTransaction(
      transID,
      transDate,
      debitAmount,
      creditAmount,
      totAmount,
    );

}
// @Get(':id')
//   getTransaction(@Param('id') transId: number) {
//     return this.transactionService.getSingleTransaction(transId);
//   }

  @Get('transaction/:id')
  getAccount(@Param('id') accountID: string) {
    return this.transactionService.getTransaction(accountID);  
  }
  




}