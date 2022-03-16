import { Jwt, User } from './../user/entities/user.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtUser, LoginInput } from 'src/user/dto/login-user.inpt';
import { Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Any } from 'typeorm';
//export type JwtUser = { token: string; userId: string };

@Resolver(() => Jwt)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Jwt)
  async login(
    @Args('login') login: LoginInput,
    @Res() res: Response,
  ): Promise<Jwt> {
    console.log(res);

    const token = await this.authService.login(login);

    return token;
  }
}
