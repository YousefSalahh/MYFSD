import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User,UserDocument } from "src/schemas/user.schema";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

<<<<<<< HEAD

  
=======
>>>>>>> fb7a16ffea15aeabfffedea2472978827b1e4fbf
  findOne({ GIUemail }): Promise<User> {
    console.log(GIUemail);
    return this.userModel.findOne({ GIUemail: GIUemail }).exec();
  }
<<<<<<< HEAD

}
=======
  findOne2({ SID }): Promise<User> {
    console.log(SID);
    return this.userModel.findOne({ SID: SID }).exec();
  }
}
>>>>>>> fb7a16ffea15aeabfffedea2472978827b1e4fbf
