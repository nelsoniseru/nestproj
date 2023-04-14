import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping() {
    return {
      message: 'Server is up and running',
      date: new Date(),
    };
  }
}
