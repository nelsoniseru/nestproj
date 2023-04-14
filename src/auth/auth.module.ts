import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {AuthUserResolver} from './auth.resolver'
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authmiddleware/local.strategy';
import { JwtModule } from '@nestjs/jwt';
//import { jwt } from 'src/config/datasource';
import { JwtStrategy } from './authmiddleware/jwt.strategy';
import {MongooseModule} from '@nestjs/mongoose'
import {AuthUser, AuthUserSchema} from './entity/auth.user.schema'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthUser.name, schema: AuthUserSchema }]),
    PassportModule,
    JwtModule.register({secret:'nelsoniseru'}),

  ],
  providers: [AuthUserResolver,AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
