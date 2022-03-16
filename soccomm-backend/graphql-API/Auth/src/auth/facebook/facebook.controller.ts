import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { FacebookService } from './facebook.service';
const logger = new Logger();
@Controller('facebook')
export class FacebookController {
  constructor(
    private facebookSerive: FacebookService,
    private jwtService: JwtService
  ) {}
  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res: Response): Promise<any> {
    const { user } = req;
    logger.log( 'Current User', JSON.stringify(user));

    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    };
   logger.log('JWT Payload', JSON.stringify(payload));

    const accessToken = await this.jwtService.sign(payload);
    logger.log('JWT-Token', accessToken);

    res.cookie('jwt', accessToken, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });

    return res.send(user);
  }
}
