import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GoogleService } from './google.service';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
} from '../guards/google-auth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService,
    private jwtService: JwtAuthService,
  ) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user } = req;
    const paylaod = {
      email: user.email,
      sub: user.id,
    };

    const { accessToken } = this.jwtService.login(req.user);
    res.cookie('jwt', accessToken, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });
    res.redirect('http://localhost:60342/#/home');
    return res.send(user);
  }

  @Get('auth')
  @UseGuards(AuthenticatedGuard)
  failure(@Req() req: Request, @Res() res: Response) {
    return req.user;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('http://localhost:5001');
  }
}
