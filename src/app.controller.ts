import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async generateAccessToken(@Query() query: { code: string }) {
    const { code } = query;
    return this.appService.generateAccessCredentials(code);
  }
}
