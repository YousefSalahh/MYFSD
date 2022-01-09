import {  HttpException, HttpStatus, Injectable, Options } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { TransactionDto } from '../transaction/dto/transaction.dto';
//import { JwtService } from "@nestjs/jwt";
import axios from 'axios';
import { externalDto } from "./external.dto";
import { AccountService } from "../account/account.service";
import { JwtStrategy } from "./strategy/Jwtstrategy";

@Injectable()
export class  externalService {
    constructor(
        private transactionService: TransactionService,
        private JwtStrategy:JwtStrategy,
        private accountService: AccountService) {}

/* Ngrok
*  allows you to expose a web server running on your local machine to the internet.
*  specify for ngrok what port to listen to
*  if not , default port is "80" -> http
*/

//sending extrnal transaction
async createExternalTransaction(authtoken:string , port:number, receiverAccNumber:string , amount:number , description:string ,accountID:number ) {
    const ngrok = require('ngrok');
    const link =  ngrok.connect({
      proto: 'http', 
      addr: port, 
      authtoken: authtoken 
        
    })

    const payload = {receiverAccNumber, amount , description} //save data in payload
   // const token = JwtStrategy.sign(payload , {secret : "sKey"});

    axios.post(`${link}/external/transferTransaction` , payload)
    .then(
        async (response:any) => {
    //checking that the balance sent isn't more than 50 and adding 5$ fee
            const balance = await this.accountService.getBalance(accountID);
            if(balance > amount+5 && amount <= 50) {
                //insert transaction
                let todayDATE = new Date(); //get date

                const insertTransaction : TransactionDto = {
                    dateOfToday : todayDATE ,
                    amount : amount,
                    accountID : accountID,
                    type : "debit",
                    transactionName : "External" ,
                    description : description
                }

            //inserting a recieved external transaction
            const postTransction = await this.transactionService.createTransaction(insertTransaction)


            //handling 5 dollar fee by posting another transaction
            const insert5dollars:TransactionDto = {
            transactionName : "5-Dollar-Fee" ,accountID: accountID,amount: 5,type : "debit" , dateOfToday:todayDATE ,description:description}
            const post5Dollars = await this.transactionService.createTransaction(insert5dollars);
            }
        } 
    )
await ngrok.disconnect(link); // stops 
}

//receiving external transfer
async recieveExternalTransfer(dto : externalDto){
    return await this.accountService.FindAccount(dto.receiverAccNumber)  //if this acc is valid
    .then(
        async (account) => {
            if(account) {
            
                let todayDATE = new Date();  //set todays date
                const initiateTransaction : TransactionDto = {    //save transaction in our transaction table
                dateOfToday : todayDATE,
                accountID : dto.receiverAccNumber ,
                type : "credit",
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