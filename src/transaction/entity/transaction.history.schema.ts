import {Prop,Schema , SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { AuthUser } from '../../auth/entity/auth.user.schema';

@Schema()
@ObjectType()
export class Transaction extends Document{
@Field(() => String)
_id: MongooseSchema.Types.ObjectId;
@Prop()
@Field(() => String, { description: 'balance' })
amount:Number;
@Prop()
@Field(() => String, { description: 'transaction id' })
transaction_id:String;
@Prop({enum: ["DEPOSIT", "WITHDRAW"]})
@Field(() => String, { description: 'category' })
transaction_category:String;
@Prop({enum: ["CREDIT", "DEBIT"]})
@Field(() => String, { description: 'status' })
status:String;
@Prop({default:()=> new Date()})
CreatedAt:Date
@Prop({default:()=> new Date()})
UpdatedAt:Date

@Prop({ type: MongooseSchema.Types.ObjectId, ref: AuthUser.name })
user_id: AuthUser;
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction)