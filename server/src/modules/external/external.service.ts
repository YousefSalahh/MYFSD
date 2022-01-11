import {  HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { TransactionDto } from '../transaction/dto/transaction.dto';
import axios from 'axios';
import { externalDto } from "./dto/external.dto";
import { AccountService } from "../account/account.service";
import { JwtStrategy } from "./strategy/Jwtstrategy";
import { ExternalDto } from "./dto/ExternalDto";
@Injectable()
export class  ExternalService {
constructor(
    private transactionService: TransactionService,
    private JwtStrategy:JwtStrategy,
    private accountService: AccountService) {}


//sending extrnal transaction

async createExternalTransaction(request: ExternalDto) {
   const balance = await this.accountService.getBalance(request.accountID);
   /**
    * get the balance of the user sending money
    * check whether their enough funds to send amount + 5$
    */
    const isSenderValid = await this.accountService.FindAccount(request.accountID);


   console.log(balance)
   const {receiverAccountNumber,amount, description}=request
   
    if(balance >= request.amount+5 && request.amount <= 50) {        
        let req: ExternalDto = {receiverAccountNumber:request.receiverAccountNumber,url:request.url,accountID:request.accountID,amount:request.amount,description:request.description};
        const token = await this.JwtStrategy.GenerateToken(req);
        console.log(token)
        axios.post(`http://${request.url}/external/transfer`, request,{headers:{'Authorization':`Bearer ${token}`,'Bypass-Tunnel-Reminder':"any"}})
        .then(async(response)=>{
            if(response){ 
            console.log("sucess")
            const insertTransaction : TransactionDto = {dateOfToday : new Date() ,amount : request.amount,accountID : request.receiverAccountNumber,
            type : "debit",transactionName : "External" ,description : request.description}

            //inserting a recieved external transaction
            await this.transactionService.createTransaction(insertTransaction)

            
            //handling 5 dollar fee by posting another transaction
            const insert5dollars:TransactionDto = {
            transactionName : "5-Dollar-Fee" , accountID : request.receiverAccountNumber,amount: 5,type : "debit" , dateOfToday:new Date() ,description:request.description}
            await this.transactionService.createTransaction(insert5dollars);

            //update the Sender balance
            this.accountService.updateSenderBalance(request.accountID , request.amount);
            this.accountService.updateSenderBalance(request.receiverAccountNumber, insert5dollars.amount);
            }
           console.log()
        }) .catch(err=>console.log(
           'error', err.response.data
        )
        
        )
    }
    else {
        throw new HttpException('InSuffiecient Funds', 400);
    }
}
   



//receiving external transfer
async recieveExternalTransfer(dto : externalDto){
    return await this.accountService.FindAccount(dto.receiverAccountNumber)  //if this acc is valid
    .then(
        async (account) => {
            if(account) {   
                //save transaction
                const initiateTransaction : TransactionDto = {dateOfToday : new Date(),accountID : dto.receiverAccountNumber ,type : "credit",
                amount : dto.amount,transactionName : "External transfer" ,description : dto.description
                }
                this.accountService.updateRecieverBalance(dto.receiverAccountNumber , dto.amount);
                console.log("sucess2")
                return  await this.transactionService.createTransaction(initiateTransaction);
            }
            else {
                throw new HttpException('account does not exist', 404);
            }
        }
        
    )
}

}