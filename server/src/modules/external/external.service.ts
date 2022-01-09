import {  HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { TransactionDto } from '../transaction/dto/transaction.dto';
import { JwtService } from "@nestjs/jwt";
import axios from 'axios';
import { externalDto } from "./external.dto";

@Injectable()
export class  externalService {
    AccountService: any;
    constructor(
        private transactionService: TransactionService,
        private jwtService: JwtService ) {}

/* Ngrok
*  allows you to expose a web server running on your local machine to the internet.
*  specify for ngrok what port to listen to
*  if not , default port is "80" -> http
*/


async createExternalTransaction(authtoken:string , port:number, receiverAccountNumber:string , amount:number , description:string ,accountID:number ) {
    const ngrok = require('ngrok');
    const link =  ngrok.connect({
      proto: 'http', 
      addr: port, 
      authtoken: authtoken 
        
    })

    const payload = {receiverAccountNumber, amount , description} //save external data in payload

    axios.post(`${link}/external/transferTransaction` , payload)
    .then(
        async (response:any) => {
            const balance = this.AccountService.getBalance(accountID);
            if(balance > amount) {
                //insert transaction
                let todayDATE = new Date(); //get date
                const insertTransaction : TransactionDto = {
                    dateOfToday : todayDATE ,
                    amount : amount,
                    accountID : accountID,
                    creditAmount : 0,
                    debitAmount : 1,
                    transactionName : "External" ,
                    description : description
                }
            //inserting a recieved external transaction
            const postTransction = await this.transactionService.createTransaction(insertTransaction)
            }
        } 
    )
await ngrok.disconnect(link); // stops 
}

async createExternalTransfer(dto : externalDto){
    return this.AccountService.findOneByAccountID((dto)).receiverAccNumber  //if this acc is valid
    .then(
        async (account) => {
            if(account) {
                let todayDATE = new Date();  //set todays date
                const initiateTransaction : TransactionDto = {    //save transaction in our transaction table
                    dateOfToday : todayDATE,
                    accountID : dto.receiverAccNumber ,
                    debitAmount : 0,
                    creditAmount : 1,
                    amount : dto.amount.valueOf(),  //amount sent from the user
                    transactionName : "External transfer" ,
                    description : dto.description
                }
             return  await this.transactionService.createTransaction(initiateTransaction);
            }
            else {
                throw new HttpException('account does not exist', HttpStatus.BAD_REQUEST);
            }
        }
    )
}

}