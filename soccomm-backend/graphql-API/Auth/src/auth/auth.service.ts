import { UserService } from './../user/user.service';
import * as bcrypt from 'bcrypt';
import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const logger = new Logger();
export type JwtUser = {
  token: string;
  userId: string;
  username: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: { email: string; password: string }) {
    const user = await this.userService.findUser(login.email);
    console.log(user);

    if (!user) {
      throw new HttpException({ message: 'Email Not Found' }, 401);
    }

    // const isVerified = await bcrypt.compare(login.password, user.password);
    // logger.log('Password', login.password);
    console.log(user.password);
    console.log(login.password);

    const isVerified = await bcrypt.compare(login.password, user.password);
    if (!isVerified) {
      throw new HttpException({ message: 'Invalid login details' }, 401);
    }
    return user;
  }

  async login(login: { email: string; password: string }) {
    const user = await this.validateUser(login);
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    logger.log('LoggedIn User', JSON.stringify(user));
    const token = await this.jwtService.sign(payload);
    const login1: JwtUser = {
      token: token,
      userId: user.id,
      username: user.username,
      email: user.email,
    };
    return login1;
  }
  async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
