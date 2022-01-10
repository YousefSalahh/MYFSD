import {  HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { TransactionDto } from '../transaction/dto/transaction.dto';
import axios from 'axios';
import { externalDto } from "./dto/external.dto";
import { AccountService } from "../account/account.service";
import { JwtStrategy } from "./strategy/Jwtstrategy";

@Injectable()
export class  ExternalService {
    constructor(
        private transactionService: TransactionService,
        private JwtStrategy:JwtStrategy,
        private accountService: AccountService) {}



//sending extrnal transaction
async createExternalTransaction(request: any) {
   const balance = await this.accountService.getBalance((request).amount);
   /**
    * get the balance of the user sending money
    * check whether their enough funds to send amount + 5$
    */
    if(balance >= request.amount+5 && request.amount <= 50) {        
        let req: externalDto = {receiverAccNumber:request.receiverAccNumber,amount:request.amount,description:request.description};
        const token = await this.JwtStrategy.GenerateToken(req,Response);
        axios.post(`http://${request.url}/external/SendingExternalTransaction`, request,{headers:{'Authorization':`${token}`,'Bypass-Tunnel-Reminder':"any"}})
        .then(async(response)=>{
            if(response){ 
            const insertTransaction : TransactionDto = {dateOfToday : new Date() ,amount : request.amount,accountID : request.receiverAccNumber,
            type : "debit",transactionName : "External" ,description : request.description}

            //inserting a recieved external transaction
            await this.transactionService.createTransaction(insertTransaction)

            
            //handling 5 dollar fee by posting another transaction
            const insert5dollars:TransactionDto = {
            transactionName : "5-Dollar-Fee" , accountID : request.receiverAccNumber,amount: 5,type : "debit" , dateOfToday:new Date() ,description:request.description}
            await this.transactionService.createTransaction(insert5dollars);

            //update the Sender balance
            this.accountService.updateSenderBalance(request.receiverAccNumber , request.amount);
            this.accountService.updateSenderBalance(request.receiverAccNumber, 5);
            }
           
        }) 
    }
        else {
            throw new HttpException('InSuffiecient Funds', HttpStatus.BAD_REQUEST);
        }
    
    }

//receiving external transfer
async recieveExternalTransfer(dto : externalDto){
    return await this.accountService.FindAccount((dto).receiverAccNumber)  //if this acc is valid
    .then(
        async (account) => {
            if(account) {   
                //save transaction
                const initiateTransaction : TransactionDto = {dateOfToday : new Date(),accountID : dto.receiverAccNumber ,type : "credit",
                amount : dto.amount.valueOf(),transactionName : "External transfer" ,description : dto.description
                }
                this.accountService.updateRecieverBalance((dto).receiverAccNumber , (dto).amount);
                return  await this.transactionService.createTransaction(initiateTransaction);
            }
            else {
                throw new HttpException('account does not exist', 404);
            }
        }
        
    )
}

}