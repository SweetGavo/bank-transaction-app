// app.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  getHello: any;
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('protected')
  protectedResource() {
    // Your protected resource logic here
  }
}
