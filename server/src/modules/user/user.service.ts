import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User,UserDocument } from "src/schemas/user.schema";
import { BadRequestException } from "@nestjs/common";
import { registerDto } from "./dto/user.dto";
//import { AccountService } from "../account/account.service";
//import { TransactionService } from "../transaction/transaction.service";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  //private AccountService=AccountService,
  //private TransactionService=TransactionService
  ){}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne({ GIUemail }): Promise<User> {
    console.log(GIUemail);
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }

  async register(dto : registerDto) {
    const user = await this.findOne({ GIUemail: dto.GIUemail });

    if(user) 
      throw new BadRequestException("Email try another");
      
    else {
      const createUser = new this.userModel(dto);
     // const createAccount = new this.AccountService.createAccount(createUser.SID);
     // const firstTransaction= new this.TransactionService.createFirstTransaction();
     // const createTransaction = new this.TransactionService.createTransaction(firstTransaction);
      return createUser.save();
      
    }
  }

}