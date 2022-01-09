import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';
import { Transactions, TransactionSchema } from 'src/schemas/transaction.schema';
import { TransactionModule } from '../transaction/transaction.module';
import { AccountModule } from '../account/account.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports:[ 
    
          TransactionModule,
          PassportModule,
          JwtModule.register({
          secret:"My-Secret-Key",
          signOptions: { expiresIn: '5min' },
          }),AccountModule
  ],
     
   
  controllers: [ExternalController],
  providers: [ExternalService],
  exports: [ExternalService,JwtService],
})

export class ExternalTransactionModule {}