import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UseGuards,Get,Post,Param,Body } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';


@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}


  @UseGuards()
  @Get(':accountID')
  transaction(@Param()accountID:number):any{
    return this.transactionService.findTransaction(accountID);

  }


}
