import { Body, Controller, Get, Post, Req, UseGuards ,Res,HttpStatus} from '@nestjs/common';
import { transaction } from 'src/utils/routes';
import { TransactionService} from './transaction.service';
import { AuthService,  ReqUser} from '../auth/auth.service';

import { TransactionDto } from './dto/dto/transaction.dto';
import { JwtAuthGuard } from '../auth/authmiddleware/jwt-auth.guard';

@Controller(transaction)
export class AuthController {
  constructor(
    private readonly  transactionService:  TransactionService
  ) {}

  @Post('/deposit')
  @UseGuards(JwtAuthGuard)
  async deposit(@Req() req: Request & ReqUser,@Body() authDto: TransactionDto) {
     const id = req.user.id
      return await this.transactionService.deposit(authDto,id);
 }
 @Post('/withdraw')
 @UseGuards(JwtAuthGuard)
 async withdraw(@Req() req: Request & ReqUser,@Body() authDto: TransactionDto) {
    const id = req.user.id
     return await this.transactionService.withdraw(authDto,id);
}
@Get('/history')
@UseGuards(JwtAuthGuard)
async transaction(@Req() req: Request & ReqUser) {
   const id = req.user.id
   return await this.transactionService.transaction_history(id);
}
}