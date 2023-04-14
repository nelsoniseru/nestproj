import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/dto/transaction.dto';
import {Transaction} from './entity/transaction.history.schema'
@Resolver(() => Transaction)
export class TransactionResolver{
    constructor(
        private readonly  transactionService:  TransactionService
    ){}
    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }
    // @Mutation(() => [AuthUser])
    // createUser(@Args('input') input: AuthDto) {
    //   return this.authService.signup(input);
    // }
}