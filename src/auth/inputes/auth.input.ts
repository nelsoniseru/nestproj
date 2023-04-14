import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  readonly _id: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  createdAt: Date;
  @Field({nullable:true})
  updatedAt: Date;
}