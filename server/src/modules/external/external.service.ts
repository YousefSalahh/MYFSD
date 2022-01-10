import {  HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { TransactionDto } from '../transaction/dto/transaction.dto';
import axios from 'axios';
import { externalDto } from "./dto/external.dto";
import { AccountService } from "../account/account.service";
import { JwtStrategy } from "./strategy/Jwtstrategy";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class  ExternalService {
    constructor(
        private transactionService: TransactionService,
        private JwtService:JwtService,
        private accountService: AccountService) {}

//sending extrnal transaction
async createExternalTransaction(request: any,dto : externalDto ) {
    const token = this.JwtService.sign(
        {
            receiverAccNumber:dto.receiverAccNumber,  //store in the token the details of the transaction
             amount:dto.amount ,   
             description:dto.description }, 
            {
              secret:"My-Secret-Key", //send secret and expiray date also in the token
              expiresIn: "5min",
            });

   axios.post(`http://${request.url}/external/SendingExternalTransaction`, request,{headers:{'Authorization':`${token}`,'Bypass-Tunnel-Reminder':"any"}})
    .then(
        async (response:any) => {
    /**checking that the balance sent isn't more than 50 
     * adding 5$ fee
     * check if the account balance more than the amount sent + transfer fees
    */ 
            const balance = await this.accountService.getBalance((dto).amount);
            if(balance > dto.amount+5 && dto.amount <= 50) {
                //insert transaction
                const insertTransaction : TransactionDto = {
                    dateOfToday : new Date() ,
                    amount : dto.amount,
                    accountID : dto.receiverAccNumber,
                    type : "debit",
                    transactionName : "External" ,
                    description : dto.description
                }
            //inserting a recieved external transaction
            const postTransction = await this.transactionService.createTransaction(insertTransaction)
            //handling 5 dollar fee by posting another transaction
            const insert5dollars:TransactionDto = {
            transactionName : "5-Dollar-Fee" , accountID : dto.receiverAccNumber,amount: 5,type : "debit" , dateOfToday:new Date() ,description:dto.description}
            const post5Dollars = await this.transactionService.createTransaction(insert5dollars);

            this.accountService.updateSenderBalance(dto.receiverAccNumber , dto.amount);
            this.accountService.updateSenderBalance(dto.receiverAccNumber, 5);
            }
        } 
    )
    }


//receiving external transfer
async recieveExternalTransfer(dto : externalDto){
    return await this.accountService.FindAccount((dto).receiverAccNumber)  //if this acc is valid
    .then(
        async (account) => {
            if(account) {
        
                const initiateTransaction : TransactionDto = {    //save transaction in our transaction table
                dateOfToday : new Date(),
                accountID : dto.receiverAccNumber ,
                type : "credit",
                amount : dto.amount.valueOf(),  //amount sent from the user
                transactionName : "External transfer" ,
                description : dto.description
                }
                this.accountService.updateRecieverBalance((dto).receiverAccNumber , (dto).amount);
                return  await this.transactionService.createTransaction(initiateTransaction);
            }
            else {
                throw new HttpException('account does not exist', HttpStatus.BAD_REQUEST);
            }
        }
        
    )
}

}