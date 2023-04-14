import {  Injectable} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
//import { jwt } from 'src/config/datasource';
import { AuthService } from '../auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from '../entity/auth.user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(AuthUser.name)
    private authModel: Model<AuthUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //secretOrKey: jwt.secret,
      secretOrKey: "nelsoniseru",
    });
  }

  async validate(payload: any) {
    const user = await this.authModel.findOne({_id:payload.sub});
    return user;
  }
}
