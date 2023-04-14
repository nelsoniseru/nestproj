import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ping } from './utils/routes';

@Controller(ping)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping() {
    return this.appService.ping();
  }
}
