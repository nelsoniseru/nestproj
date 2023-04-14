import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../transaction/entity/transaction.history.schema';
import { AuthUser } from '../auth/entity/auth.user.schema';
import { TransactionDto } from './dto/dto/transaction.dto';
import { Model } from 'mongoose';
var randomstring = require("randomstring");

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)  private transctionModel: Model<Transaction>,
    @InjectModel(AuthUser.name) private authUser: Model<AuthUser>
  
   
   
  ) {}


async deposit(transactionDto: TransactionDto, user_id:string){ 
  
     let user = await this.authUser.findOne({_id:user_id})
    
     if(transactionDto.amount <= 0)  return {statusCode:400,message:"amount too low for deposit" }
     user.balance = Number(user.balance) + Number(transactionDto.amount)
     const newTransac = new this.transctionModel({
      user_id,
      amount:transactionDto.amount,
      transaction_category:"DEPOSIT",
      transaction_id:randomstring.generate(6),
      status:"CREDIT",
    });

    newTransac.save();
    this.authUser.findOneAndUpdate(
      { _id:user_id  }, 
      { balance:user.balance})
    .exec();
   
    return {statusCode:200,message:"transaction successful"}
}

async withdraw(transactionDto: TransactionDto, user_id:string){ 
  let user = await this.authUser.findOne({_id:user_id})
  if (user.balance < transactionDto.amount || transactionDto.amount  <= 0 )  return {statusCode:400,message:"amount too low for withdrawal" }
  user.balance = Number(user.balance) - Number(transactionDto.amount)
  const newTransac = new this.transctionModel({
    user_id,
    amount:transactionDto.amount,
    transaction_category:"WITHDRAW",
    transaction_id:randomstring.generate(6),
    status:"DEBIT",
  });

  newTransac.save();
  this.authUser.findOneAndUpdate(
    { _id:user_id  }, 
    { balance:user.balance}
    ).exec();
 
    return {statusCode:200,message:"witdrawal successful"}

}


async transaction_history(user_id:string){ 
  return this.transctionModel.find({user_id}).sort({CreatedAt:-1}).populate('user_id').exec();
 
}
}
