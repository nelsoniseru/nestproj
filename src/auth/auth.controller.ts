import { Body, Controller, Get, Post, Req, UseGuards ,Res,HttpStatus} from '@nestjs/common';
import { auth } from 'src/utils/routes';
import { AuthService,  ReqUser} from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './authmiddleware/jwt-auth.guard';
import { LocalAuthGuard } from './authmiddleware/local-auth.guard';

@Controller(auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() authDto: AuthDto) {

      return await this.authService.signup(authDto);
 
  }

   @Post('/login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
 
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request & ReqUser) {
  return await this.authService.getProfile(req.user.id);
  }



}
