import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
@InputType()
export class TransactionDto {
  @Field()
  readonly _id: string
  @IsNotEmpty()
  @Field(() => String, { description: 'amount of the user deposit' })
  amount: number;
 
}