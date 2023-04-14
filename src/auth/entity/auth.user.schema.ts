import {Prop,Schema , SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
@Schema()
@ObjectType()
export class AuthUser extends Document{
@Field(() => String)
_id: MongooseSchema.Types.ObjectId;
@Prop({default:0})
@Field()
balance:Number;
@Prop()
@Field(() => String, { description: 'Email' })
email:String;
@Prop()
@Field(() => String, { description: 'Password' })
password:String;
@Prop({default:()=> new Date()})
CreatedAt:Date
@Prop({required:false,default:null})
UpdatedAt:Date
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser)