import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User,UserDocument } from "src/schemas/user.schema";
import { BadRequestException } from "@nestjs/common";
import { registerDto } from "./dto/user.dto";
import { AccountService } from "../account/account.service";
import { TransactionService } from "../transaction/transaction.service";

import { forwardRef, Inject } from "@nestjs/common";


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AccountService))
    private AccountService: AccountService,
    @Inject(forwardRef(() => TransactionService))
    private TransactionService: TransactionService
  ){}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne({ GIUemail }): Promise<User> {
    console.log(GIUemail);
    return await this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }

  async register(dto : registerDto) {
    const user = await this.userModel.findOne({ GIUemail: dto.GIUemail });

    if(user) 
      throw new BadRequestException("Email try another");
      
    else {
      const createUser = new this.userModel(dto);
      
      const createAccount = await this.AccountService.createAccount(dto.SID);
      const firstTransaction = this.TransactionService.createFirstTransaction();
      this.TransactionService.createTransaction({ ...firstTransaction, accountID: createAccount.accountID });
      
      return createUser.save();
      
    }
  }

}