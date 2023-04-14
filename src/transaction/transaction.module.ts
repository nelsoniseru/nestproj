import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './transaction.controller';
import {TransactionResolver} from './transaction.resolver'
import { JwtModule } from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose'
import {Transaction, TransactionSchema} from './entity/transaction.history.schema'
import {AuthUser, AuthUserSchema} from '../auth/entity/auth.user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: AuthUser.name, schema: AuthUserSchema }
    ]),

  ],
  providers: [TransactionResolver,TransactionService,],
  controllers: [AuthController],
})
export class TransactionModule {}
