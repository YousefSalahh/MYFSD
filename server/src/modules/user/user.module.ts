import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@sp/schemas';
//import { TransactionModule } from '../transaction/transaction.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),/*TransactionModule*/],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}