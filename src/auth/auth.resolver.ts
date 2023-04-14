import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {AuthUser} from './entity/auth.user.schema'
@Resolver(() => AuthUser)
export class AuthUserResolver{
    constructor(
        private readonly authService: AuthService
    ){}
    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }
    @Mutation(() => [AuthUser])
    createUser(@Args('input') input: AuthDto) {
      return this.authService.signup(input);
    }
}