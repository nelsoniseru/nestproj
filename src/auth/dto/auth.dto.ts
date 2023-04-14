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
export class AuthDto {
  @Field()
  readonly _id: string;
  
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'password of the user' })
  password: string;
  @Field()
  createdAt: Date;
  @Field({nullable:true})
  updatedAt: Date;
}