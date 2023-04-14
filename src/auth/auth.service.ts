import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './entity/auth.user.schema';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type ReqUser = {
  user: { id: string }
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name)
    private authModel: Model<AuthUser>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(password: string, hash: any) {
    return await bcrypt.compare(password, hash);
    }

  

  async validateEmail(email:string) {
    const user = await this.authModel.findOne({
      email: email,
    });
    console.log(user)
     return user
   
  }


  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async signup(authDto: AuthDto){
    const { email, password, } = authDto;

   const existingUser = await this.validateEmail(email);

    if (existingUser)  return {statusCode:400,message:`${email} already taken`}
   const hash = await this.hashPassword(password)
    const newUser = new this.authModel({
      email:authDto.email,
      password:hash,
    });
   newUser.save();


    return { statusCode: 200,id: newUser.id, message:"User created successfully" };
  }

 async login(authDto: AuthDto) {
    const { email, password, } = authDto;
    const res = await this.authModel.findOne({
      email: email,
    });
       if(res == null) return {statusCode:400,message:`invalid credentials`}
       const user = await this.validateUser(password, res.password);
      if(user == false) return {statusCode:400,message:`invalid credentials`}

    const payload = { sub: res.id };
    return {
      statusCode:200,
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: string) {
    const user = await this.authModel.findOne({
      _id: userId 
    });
    

    if (!user) throw new NotFoundException('Profile not found');

    return user;
  }


}
