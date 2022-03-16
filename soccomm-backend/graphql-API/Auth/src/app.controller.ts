import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Roles } from './auth/decorator/role.decorator';
import { RolesGuard } from './auth/guards/role-auth.guard';
import { Role } from './user/roles';

const logger = new Logger()
@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}
  @Get()
  @Roles(Role.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getHello(@Request() req): string {
    logger.log('JWT Cookie', req.cookies['jwt']);
    logger.log("Current User",JSON.stringify(req.user));

    return this.appService.getHello();
  }
}
